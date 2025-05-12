# Pour instancier la bd, exécuter dans

1. Faire un build de la solution.
1. Ouvrir une fenêtre console dans visual studio en cliquant droit sur le projet CleanTodo.Infrastructure + terminal
1. Avoir une instance de base de données sur son ordinateur
1. Rouler `dotnet ef migrations add InitialCreate --startup-project ..\CleanTodo.WebAPI --project ./` pour créer la bd
1. Rouler les deux dernières commandes ci-bas

```
dotnet ef migrations add InitialCreate
dotnet ef database update
```