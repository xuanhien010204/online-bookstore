# # Dockerfile
# FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
# WORKDIR /app
# EXPOSE 7086
# EXPOSE 5005

# ENV ASPNETCORE_URLS="https://+:7086;http://+:5005"
# ENV ASPNETCORE_ENVIRONMENT=Development

# FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
# WORKDIR /src
# COPY . .

# RUN dotnet restore
# RUN dotnet publish -c Release -o /app/publish

# FROM base AS final
# WORKDIR /app
# COPY --from=build /app/publish .

# ENTRYPOINT ["dotnet", "OnlineBookstore.Api.dll"]


FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy solution and restore as distinct layers
COPY ../OnlineBookstore.Api.sln ./
COPY ../OnlineBookstore.Domain/*.csproj ./OnlineBookstore.Domain/
COPY ../OnlineBookstore.Application/*.csproj ./OnlineBookstore.Application/
COPY ../OnlineBookstore.Infrastructure/*.csproj ./OnlineBookstore.Infrastructure/
COPY ../OnlineBookstore.Api/*.csproj ./OnlineBookstore.Api/

RUN dotnet restore

# Copy all source code
COPY ../OnlineBookstore.Domain ./OnlineBookstore.Domain/
COPY ../OnlineBookstore.Application ./OnlineBookstore.Application/
COPY ../OnlineBookstore.Infrastructure ./OnlineBookstore.Infrastructure/
COPY ../OnlineBookstore.Api ./OnlineBookstore.Api/

WORKDIR /app/OnlineBookstore.Api
RUN dotnet publish -c Release -o out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/OnlineBookstore.Api/out ./
ENTRYPOINT ["dotnet", "OnlineBookstore.Api.dll"]
