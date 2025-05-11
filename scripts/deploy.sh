#!/bin/bash

# Load environment variables from .env.aws
set -a
source .env.aws
set +a

# Set the full repository URI
REPOSITORY_URI=public.ecr.aws/r1x2q5z0/mgb-softeng

# Generate timestamp for versioning
TIMESTAMP=$(date +%m-%d-%H-%M)

# Login to AWS ECR
echo "Logging in to AWS ECR..."
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/r1x2q5z0


# Build the Docker image with production target and environment variables
echo "Building Docker image..."
docker build --target production --platform linux/amd64 \
  --build-arg POSTGRES_USER=$POSTGRES_USER \
  --build-arg POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  --build-arg POSTGRES_DB=$POSTGRES_DB \
  --build-arg POSTGRES_HOST=$POSTGRES_HOST \
  --build-arg POSTGRES_PORT=$POSTGRES_PORT \
  --build-arg POSTGRES_URL="$POSTGRES_URL" \
  --build-arg NODE_ENV=$NODE_ENV \
  --build-arg PORT=$PORT \
  --build-arg FRONTEND_PORT=$FRONTEND_PORT \
  --build-arg BACKEND_PORT=$BACKEND_PORT \
  --build-arg VITE_GOOGLE_MAPS_API_KEY=$VITE_GOOGLE_MAPS_API_KEY \
  --build-arg VITE_PUBLIC_AUTH0_CLIENT_ID=$VITE_PUBLIC_AUTH0_CLIENT_ID \
  --build-arg VITE_PUBLIC_AUTH0_DOMAIN=$VITE_PUBLIC_AUTH0_DOMAIN \
  -t public.ecr.aws/r1x2q5z0/mgb-softeng:$TIMESTAMP \
  -f ./docker/Dockerfile .

# Tag the image with latest
echo "Tagging image as latest..."
docker tag public.ecr.aws/r1x2q5z0/mgb-softeng:$TIMESTAMP public.ecr.aws/r1x2q5z0/mgb-softeng

# Push both tags to ECR
echo "Pushing images to ECR..."
docker push public.ecr.aws/r1x2q5z0/mgb-softeng:$TIMESTAMP
docker push public.ecr.aws/r1x2q5z0/mgb-softeng:latest

echo "Deployment complete!"
