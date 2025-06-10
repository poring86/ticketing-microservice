# Ticketing microservice

## About the project

It is a full stack ecommerce application for tickets purchase

## Some of technologies used on the project

- Typescript
- React
- Next
- NodeJs
- MongoDB
- Mongoose
- NATS
- Redis
- Bull
- JWT
- Stripe
- Jest
- Docker
- NATS
- Kubernetes
- Skaffold
- Github Actions
- Microservices Asynchronous Message-Based Communication Architecture
- CI/CD Pipeline
- Digital Ocean

## How to run the project

**Prerequisites:** Docker, Kubernetes and Skaffold installed on your machine

```bash
# Clone repository
git clone ticketing-microservice

# Enter on the project folder
cd ticketing-microservice

# Create Kubernetes secrets before starting the application
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_secret_key
kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY=your_stripe_key

# Start the application
skaffold dev

# Run the tests
npm run test
```
