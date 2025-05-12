using ESP2025.Application.DTOS;
using ESP2025.Application.Exceptions;
using ESP2025.Application.UseCases.Order.Interfaces;
using ESP2025.Domain.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ESP2025.Application.UseCases.Order
{
    public class CreateOrderUseCase : ICreateOrderUseCase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        private readonly IOrderItemRepository _orderItemRepository;


        public CreateOrderUseCase(
            IOrderRepository orderRepository,
            IProductRepository productRepository,
            IUserRepository userRepository,
            IOrderItemRepository orderItemRepository)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
            _orderItemRepository = orderItemRepository;
        }

        public async Task<OrderDto> Execute(int userId, CreateOrderDto createOrderDto)
        {
            // Vérifier que l'utilisateur existe
            var user = await _userRepository.FindById(userId);
            if (user == null)
            {
                throw new Exception("Utilisateur non trouvé");
            }

            // Vérifier qu'il y a des articles dans la commande
            if (createOrderDto.OrderItems.Count == 0)
            {
                throw new Exception("La commande doit contenir au moins un article");
            }

            // Créer la commande
            var totalPoints = 0;
            var orderItems = new System.Collections.Generic.List<OrderItem>();

            foreach (var item in createOrderDto.OrderItems)
            {
                var product = await _productRepository.FindById(item.ProductId);
                if (product == null)
                {
                    throw new Exception($"Produit {item.ProductId} non trouvé");
                }

                // Vérifier la disponibilité du produit
                if (!product.IsActive || product.Quantity < item.Quantity)
                {
                    throw new Exception($"Le produit {product.Name} n'est pas disponible en quantité suffisante");
                }

                // Ajouter l'article à la commande
                orderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    SizeId = item.SizeId,
                    Quantity = item.Quantity,
                    PointsAtPurchase = product.Points
                });

                // Mettre à jour le total des points
                totalPoints += product.Points * item.Quantity;

                // Mettre à jour la quantité du produit
                product.Quantity -= item.Quantity;
                await _productRepository.Update(product);
            }

            // Vérifier si l'utilisateur a assez de points
            if (user.Points < totalPoints)
            {
                throw new Exception("Vous n'avez pas assez de points pour passer cette commande");
            }

            // Déduire les points de l'utilisateur
            user.Points -= totalPoints;
            await _userRepository.Update(user);

            // Générer un numéro de commande unique
            var orderNumber = GenerateOrderNumber();

            // Créer l'objet de commande
            var order = new Domain.Entities.Order
            {
                UserId = userId,
                OrderStatusId = 1, // Statut "pending" (à définir dans la base de données)
                OrderNumber = orderNumber,
                OrderDate = DateTime.UtcNow,
                ExpectedDeliveryDate = DateTime.UtcNow.AddDays(2), // Livraison prévue dans 2 jours
                TotalPoints = totalPoints
            };

            // Ajouter la commande en base de données
            var createdOrder = await _orderRepository.Create(order);

            // Ajouter les articles à la commande
            foreach (var item in orderItems)
            {
                item.OrderId = createdOrder.IdOrder;
                await _orderItemRepository.Create(item);
            }


            // Récupérer la commande complète pour la renvoyer
            var completeOrder = await _orderRepository.GetOrderById(createdOrder.IdOrder);
            if (completeOrder == null)
            {
                throw new Exception("Erreur lors de la récupération de la commande créée");
            }

            // Convertir en DTO
            return new OrderDto
            {
                IdOrder = completeOrder.IdOrder,
                UserId = completeOrder.UserId,
                UserName = $"{user.FirstName} {user.LastName}",
                OrderNumber = completeOrder.OrderNumber,
                OrderDate = completeOrder.OrderDate,
                ExpectedDeliveryDate = completeOrder.ExpectedDeliveryDate,
                ActualDeliveryDate = completeOrder.ActualDeliveryDate,
                Status = "pending", // À remplacer par le statut réel
                TotalPoints = completeOrder.TotalPoints,
                OrderItems = orderItems.Select(oi => new OrderItemDetailDto
                {
                    IdOrderItem = oi.IdOrderItem,
                    ProductId = oi.ProductId,
                    SizeId = oi.SizeId,
                    Quantity = oi.Quantity,
                    PointsAtPurchase = oi.PointsAtPurchase,
                    ProductName = oi.Product?.Name ?? "Produit inconnu",
                    SizeStatus = oi.Size?.Status ?? "Taille inconnue"
                }).ToList()
            };
        }

        private string GenerateOrderNumber()
        {
            // Format: 123456-123456
            var random = new Random();
            var prefix = random.Next(100000, 999999);
            var suffix = random.Next(100000, 999999);
            return $"{prefix}-{suffix}";
        }
    }
}