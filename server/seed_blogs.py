"""
Seed script to add technical blogs to the database.
Run: python seed_blogs.py
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "techblog")

BLOGS = [
    {
        "title": "Linux Essentials: A Complete Beginner's Guide",
        "tags": ["Linux", "DevOps", "System Administration"],
        "content": """# Linux Essentials

## What is Linux?
Linux is a free, open-source operating system kernel created by Linus Torvalds in 1991. It powers everything from smartphones (Android) to supercomputers.

## Key Concepts

### 1. File System Hierarchy
- `/` - Root directory (everything starts here)
- `/home` - User home directories
- `/etc` - Configuration files
- `/var` - Variable data (logs, databases)
- `/usr` - User programs and utilities
- `/bin` - Essential command binaries
- `/tmp` - Temporary files

### 2. Essential Commands

**Navigation:**
- `pwd` - Print working directory
- `cd /path` - Change directory
- `ls -la` - List files with details
- `tree` - Show directory structure

**File Operations:**
- `cp source dest` - Copy files
- `mv source dest` - Move/rename files
- `rm file` - Remove files
- `mkdir dir` - Create directory
- `touch file` - Create empty file

**File Viewing:**
- `cat file` - Display entire file
- `less file` - View file with pagination
- `head -n 10 file` - First 10 lines
- `tail -f file` - Follow file (great for logs)

**Search:**
- `find /path -name "*.txt"` - Find files by name
- `grep "pattern" file` - Search in files
- `grep -r "pattern" /dir` - Recursive search

### 3. Permissions
```
-rwxr-xr-- 1 user group 4096 Jan 1 12:00 file.txt
```
- `r` (read=4), `w` (write=2), `x` (execute=1)
- First triplet: Owner permissions
- Second triplet: Group permissions
- Third triplet: Others permissions

**Commands:**
- `chmod 755 file` - Set permissions (rwxr-xr-x)
- `chown user:group file` - Change ownership

### 4. Process Management
- `ps aux` - List all processes
- `top` or `htop` - Interactive process viewer
- `kill PID` - Terminate process
- `kill -9 PID` - Force kill
- `nohup command &` - Run in background

### 5. Package Management

**Debian/Ubuntu (apt):**
- `apt update` - Update package list
- `apt upgrade` - Upgrade packages
- `apt install package` - Install package

**RHEL/CentOS (yum/dnf):**
- `dnf install package` - Install package
- `dnf update` - Update all packages

## Quick Reference
| Task | Command |
|------|---------|
| Check disk space | `df -h` |
| Check memory | `free -h` |
| Network info | `ip addr` or `ifconfig` |
| Check ports | `netstat -tulpn` or `ss -tulpn` |
| System info | `uname -a` |
"""
    },
    {
        "title": "Docker Fundamentals: Containers Made Simple",
        "tags": ["Docker", "Containers", "DevOps"],
        "content": """# Docker Fundamentals

## What is Docker?
Docker is a platform for developing, shipping, and running applications in containers. Containers package code and dependencies together, ensuring consistency across environments.

## Key Concepts

### 1. Images vs Containers
- **Image**: Read-only template with instructions (like a class)
- **Container**: Running instance of an image (like an object)

### 2. Dockerfile Basics
```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
```

### 3. Essential Commands

**Images:**
- `docker build -t myapp:1.0 .` - Build image
- `docker images` - List images
- `docker rmi image_name` - Remove image
- `docker pull nginx` - Download image

**Containers:**
- `docker run -d -p 3000:3000 myapp` - Run container
- `docker ps` - List running containers
- `docker ps -a` - List all containers
- `docker stop container_id` - Stop container
- `docker rm container_id` - Remove container
- `docker logs container_id` - View logs
- `docker exec -it container_id sh` - Enter container

### 4. Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

**Commands:**
- `docker-compose up -d` - Start all services
- `docker-compose down` - Stop and remove
- `docker-compose logs -f` - Follow logs

### 5. Best Practices

1. **Use multi-stage builds** to reduce image size
2. **Don't run as root** - Use USER instruction
3. **Use .dockerignore** to exclude files
4. **One process per container**
5. **Use specific image tags** (not `latest`)

### 6. Networking
- `bridge` - Default network (containers can communicate)
- `host` - Use host's network
- `none` - No networking

```bash
docker network create mynetwork
docker run --network mynetwork myapp
```

### 7. Volumes (Persistent Data)
```bash
# Named volume
docker run -v mydata:/app/data myapp

# Bind mount
docker run -v $(pwd)/data:/app/data myapp
```

## Quick Reference
| Task | Command |
|------|---------|
| Build image | `docker build -t name .` |
| Run container | `docker run -d -p 8080:80 name` |
| View logs | `docker logs -f container` |
| Enter shell | `docker exec -it container sh` |
| Clean up | `docker system prune -a` |
"""
    },
    {
        "title": "Kubernetes Basics: Container Orchestration Guide",
        "tags": ["Kubernetes", "K8s", "DevOps", "Container Orchestration"],
        "content": """# Kubernetes Basics

## What is Kubernetes?
Kubernetes (K8s) is an open-source container orchestration platform. It automates deployment, scaling, and management of containerized applications.

## Core Components

### 1. Control Plane
- **API Server**: Frontend for K8s (kubectl talks to this)
- **etcd**: Key-value store for cluster data
- **Scheduler**: Assigns pods to nodes
- **Controller Manager**: Runs controllers (replication, endpoints, etc.)

### 2. Worker Nodes
- **Kubelet**: Agent that runs on each node
- **Kube-proxy**: Network proxy for services
- **Container Runtime**: Docker/containerd

## Key Objects

### 1. Pod
Smallest deployable unit. Usually one container per pod.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.25
    ports:
    - containerPort: 80
```

### 2. Deployment
Manages ReplicaSets and provides declarative updates.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.25
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

### 3. Service
Exposes pods to network traffic.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP  # or NodePort, LoadBalancer
```

**Service Types:**
- `ClusterIP`: Internal only (default)
- `NodePort`: Exposes on node's IP
- `LoadBalancer`: Cloud provider's load balancer

### 4. ConfigMap & Secret
```yaml
# ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_URL: "postgres://db:5432"
  LOG_LEVEL: "info"

---
# Secret
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  PASSWORD: cGFzc3dvcmQxMjM=  # base64 encoded
```

### 5. Ingress
HTTP/HTTPS routing to services.

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: nginx-service
            port:
              number: 80
```

## Essential kubectl Commands

```bash
# Cluster info
kubectl cluster-info
kubectl get nodes

# Pods
kubectl get pods
kubectl describe pod pod-name
kubectl logs pod-name
kubectl exec -it pod-name -- sh

# Deployments
kubectl get deployments
kubectl apply -f deployment.yaml
kubectl rollout status deployment/name
kubectl rollout undo deployment/name

# Services
kubectl get services
kubectl expose deployment name --port=80

# Debugging
kubectl get events
kubectl top pods
kubectl describe node node-name
```

## Quick Reference
| Object | Purpose |
|--------|---------|
| Pod | Single container instance |
| Deployment | Manages pod replicas |
| Service | Network access to pods |
| ConfigMap | Non-sensitive config |
| Secret | Sensitive data |
| Ingress | HTTP routing |
| PersistentVolume | Storage |
"""
    },
    {
        "title": "AWS EKS: Managed Kubernetes on AWS",
        "tags": ["AWS", "EKS", "Kubernetes", "Cloud"],
        "content": """# AWS EKS: Elastic Kubernetes Service

## What is EKS?
Amazon EKS is a managed Kubernetes service that runs the Kubernetes control plane across multiple AWS availability zones.

## Key Components

### 1. EKS Control Plane
- Managed by AWS
- Runs across 3 AZs
- Auto-scales, auto-patches
- You pay ~$0.10/hour per cluster

### 2. Worker Nodes Options
- **Managed Node Groups**: AWS manages EC2 instances
- **Self-managed Nodes**: You manage EC2 instances
- **Fargate**: Serverless, pay per pod

## Setting Up EKS

### 1. Using eksctl (Recommended)
```bash
# Install eksctl
curl --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz

# Create cluster
eksctl create cluster \\
  --name my-cluster \\
  --region us-west-2 \\
  --nodegroup-name workers \\
  --node-type t3.medium \\
  --nodes 3 \\
  --nodes-min 1 \\
  --nodes-max 5 \\
  --managed

# Get kubeconfig
aws eks update-kubeconfig --name my-cluster --region us-west-2
```

### 2. Node Groups
```yaml
# nodegroup.yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: my-cluster
  region: us-west-2

managedNodeGroups:
  - name: workers
    instanceType: t3.medium
    desiredCapacity: 3
    minSize: 1
    maxSize: 10
    volumeSize: 50
    ssh:
      allow: true
    labels:
      role: worker
    tags:
      Environment: production
```

## EKS Add-ons

### 1. AWS Load Balancer Controller
Provisions ALB/NLB for Ingress and Services.

```bash
# Install using Helm
helm repo add eks https://aws.github.io/eks-charts
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \\
  -n kube-system \\
  --set clusterName=my-cluster
```

### 2. Cluster Autoscaler
Automatically adjusts node count.

### 3. EBS CSI Driver
For persistent storage using EBS volumes.

## IAM Integration

### IRSA (IAM Roles for Service Accounts)
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789:role/my-app-role
```

## Networking

### VPC CNI
- Each pod gets an ENI IP from VPC
- Pods can communicate directly with AWS services
- Security groups can be applied to pods

## Best Practices

1. **Use managed node groups** for easier management
2. **Enable cluster logging** to CloudWatch
3. **Use IRSA** instead of node instance roles
4. **Implement network policies** for security
5. **Set up cluster autoscaler** for cost optimization
6. **Use Fargate for burstable workloads**

## Costs Breakdown
| Component | Cost |
|-----------|------|
| Control Plane | ~$73/month |
| Worker Nodes | EC2 pricing |
| Fargate | Per vCPU/memory |
| Data Transfer | Standard AWS rates |
"""
    },
    {
        "title": "CI/CD Pipeline: From Code to Production",
        "tags": ["CI/CD", "DevOps", "Automation", "GitHub Actions"],
        "content": """# CI/CD Pipeline Guide

## What is CI/CD?

- **CI (Continuous Integration)**: Automatically build and test code on every commit
- **CD (Continuous Delivery)**: Automatically deploy to staging
- **CD (Continuous Deployment)**: Automatically deploy to production

## Pipeline Stages

```
Code → Build → Test → Security Scan → Deploy to Staging → Deploy to Production
```

## GitHub Actions Example

### 1. Basic CI Pipeline
```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm test -- --coverage
    
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

### 2. Docker Build & Push
```yaml
  build-docker:
    needs: build-and-test
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKER_USERNAME }}
        password: ${{ secrets.DOCKER_TOKEN }}
    
    - name: Build and push
      uses: docker/build-push-action@v5
      with:
        push: true
        tags: myapp:${{ github.sha }}
```

### 3. Deploy to Kubernetes
```yaml
  deploy:
    needs: build-docker
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Configure AWS credentials
      uses: aws-actions/configure-aws-credentials@v4
      with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: us-west-2
    
    - name: Update kubeconfig
      run: aws eks update-kubeconfig --name my-cluster
    
    - name: Deploy to EKS
      run: |
        kubectl set image deployment/myapp \\
          myapp=myrepo/myapp:${{ github.sha }}
        kubectl rollout status deployment/myapp
```

## Best Practices

### 1. Pipeline Design
- Keep pipelines fast (< 10 minutes)
- Run tests in parallel
- Cache dependencies
- Fail fast (lint before tests)

### 2. Security
- Never hardcode secrets
- Use environment-specific secrets
- Scan for vulnerabilities
- Sign your artifacts

### 3. Deployment Strategies

**Rolling Update:**
```yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
```

**Blue-Green:**
- Deploy to new environment
- Switch traffic via load balancer
- Instant rollback capability

**Canary:**
- Deploy to small % of traffic
- Monitor metrics
- Gradually increase traffic

## Pipeline Stages Checklist

| Stage | Actions |
|-------|---------|
| Build | Compile, bundle, create artifacts |
| Test | Unit, integration, e2e tests |
| Security | SAST, dependency scan, secrets scan |
| Quality | Code coverage, linting |
| Deploy | Push to registry, update K8s |
| Verify | Health checks, smoke tests |
"""
    },
    {
        "title": "Monorepo vs Polyrepo: Repository Strategies",
        "tags": ["Monorepo", "Polyrepo", "Architecture", "Git"],
        "content": """# Monorepo vs Polyrepo

## What's the Difference?

### Monorepo
All projects/services in ONE repository.
```
my-company/
├── apps/
│   ├── web-app/
│   ├── mobile-app/
│   └── admin-dashboard/
├── packages/
│   ├── ui-components/
│   ├── utils/
│   └── api-client/
└── package.json
```

### Polyrepo
Each project in its OWN repository.
```
my-company/web-app
my-company/mobile-app
my-company/admin-dashboard
my-company/ui-components
my-company/utils
```

## Comparison

| Aspect | Monorepo | Polyrepo |
|--------|----------|----------|
| Code Sharing | Easy | Requires publishing packages |
| Atomic Changes | Single PR across projects | Multiple PRs, coordination needed |
| CI/CD | Complex, but unified | Simple per repo |
| Dependencies | Shared, single version | Independent versions |
| Team Autonomy | Less | More |
| Onboarding | Steeper learning curve | Easier (smaller scope) |

## Monorepo: Deep Dive

### Tools
- **Nx**: Full-featured build system
- **Turborepo**: Fast, caching-focused
- **Lerna**: Package management
- **pnpm workspaces**: Efficient package manager

### Turborepo Example
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

```json
// package.json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### Benefits
1. **Atomic commits**: Change shared code + consumers together
2. **Code reuse**: Easy imports between projects
3. **Consistent tooling**: Same linting, testing setup
4. **Refactoring**: IDE finds all usages

### Challenges
1. **Build times**: Need smart caching
2. **Git performance**: Large repos can be slow
3. **Access control**: Everyone sees everything
4. **CI complexity**: Need to know what changed

## Polyrepo: Deep Dive

### Package Publishing
```json
// In shared-utils repo
{
  "name": "@mycompany/utils",
  "version": "1.2.0",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  }
}
```

### Benefits
1. **Clear ownership**: One team, one repo
2. **Independent deployments**: No coordination needed
3. **Simple CI**: Only builds that repo
4. **Access control**: Fine-grained permissions

### Challenges
1. **Dependency hell**: Version conflicts
2. **Code duplication**: Copying instead of sharing
3. **Cross-repo changes**: Multiple PRs, slow

## When to Choose What?

### Choose Monorepo When:
- Strong code sharing needs
- Frequent cross-project changes
- Small-medium team size
- Unified tech stack

### Choose Polyrepo When:
- Independent teams/products
- Different tech stacks
- Strict access control needed
- Microservices with clear boundaries

## Hybrid Approach
Many companies use both:
- Monorepo for related frontend apps
- Polyrepo for independent microservices
"""
    },
    {
        "title": "Module Federation: Micro-Frontends at Scale",
        "tags": ["Module Federation", "Micro-Frontends", "Webpack", "React"],
        "content": """# Module Federation

## What is Module Federation?
Webpack 5 feature that allows loading code from other builds at runtime. Enables true micro-frontends where teams can deploy independently.

## Key Concepts

### 1. Host and Remote
- **Host**: The shell application that loads remotes
- **Remote**: Independent app that exposes components

### 2. Architecture
```
┌─────────────────────────────────────┐
│           Shell (Host)               │
│  ┌─────────┐ ┌─────────┐ ┌────────┐ │
│  │ Header  │ │  Nav    │ │ Footer │ │
│  └─────────┘ └─────────┘ └────────┘ │
│  ┌─────────────────────────────────┐ │
│  │      Content Area               │ │
│  │  ┌─────────┐  ┌─────────────┐   │ │
│  │  │ Remote1 │  │   Remote2   │   │ │
│  │  │ (Team A)│  │  (Team B)   │   │ │
│  │  └─────────┘  └─────────────┘   │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Implementation

### Remote App (Team A's Product Catalog)
```javascript
// webpack.config.js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'productCatalog',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/components/ProductList',
        './ProductCard': './src/components/ProductCard',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
};
```

### Host App (Shell)
```javascript
// webpack.config.js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    productCatalog: 'productCatalog@http://localhost:3001/remoteEntry.js',
    checkout: 'checkout@http://localhost:3002/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
```

### Using Remote Component
```jsx
// In Shell app
import React, { Suspense, lazy } from 'react';

const ProductList = lazy(() => import('productCatalog/ProductList'));

function App() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
```

## Shared Dependencies

### Singleton Pattern
Ensures only one instance of React exists:
```javascript
shared: {
  react: {
    singleton: true,
    strictVersion: true,
    requiredVersion: '^18.0.0',
  },
}
```

### Version Mismatches
- `eager: true` - Load immediately (no async)
- `strictVersion: true` - Error on version mismatch

## Best Practices

### 1. Error Boundaries
```jsx
<ErrorBoundary fallback={<FallbackUI />}>
  <Suspense fallback={<Loading />}>
    <RemoteComponent />
  </Suspense>
</ErrorBoundary>
```

### 2. Dynamic Remotes
```javascript
const loadComponent = (scope, module) => {
  return async () => {
    await __webpack_init_sharing__('default');
    const container = window[scope];
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    return factory();
  };
};
```

### 3. Deployment
- Each remote deploys independently
- Update remoteEntry.js URL in production
- Use versioned URLs for rollbacks

## Benefits
| Benefit | Description |
|---------|-------------|
| Independent Deploys | Teams ship without coordination |
| Tech Flexibility | Different frameworks possible |
| Smaller Bundles | Load only what's needed |
| Team Autonomy | Own your code end-to-end |

## Challenges
- Shared state management
- Consistent styling
- Version compatibility
- Debugging across boundaries
"""
    },
    {
        "title": "Saga Pattern: Managing Distributed Transactions",
        "tags": ["Saga Pattern", "Microservices", "Architecture", "Distributed Systems"],
        "content": """# Saga Pattern

## The Problem
In microservices, a business transaction spans multiple services. Traditional ACID transactions don't work across service boundaries.

**Example: E-commerce Order**
1. Order Service → Create order
2. Payment Service → Charge card
3. Inventory Service → Reserve items
4. Shipping Service → Schedule delivery

If step 3 fails, we need to undo steps 1 and 2!

## What is Saga?
A saga is a sequence of local transactions. Each service:
- Performs its transaction
- Publishes an event
- If failure occurs, executes compensating transactions

## Two Approaches

### 1. Choreography (Event-Driven)
Services react to events without central coordination.

```
Order Created → Payment Charged → Inventory Reserved → Shipping Scheduled
     ↓               ↓                  ↓                    ↓
  (if fail)      Refund Payment    Release Inventory    Cancel Shipment
```

```javascript
// Order Service
async function createOrder(orderData) {
  const order = await db.orders.create(orderData);
  await eventBus.publish('order.created', { orderId: order.id });
  return order;
}

// Payment Service listens
eventBus.subscribe('order.created', async (event) => {
  try {
    await chargePayment(event.orderId);
    await eventBus.publish('payment.completed', event);
  } catch (error) {
    await eventBus.publish('payment.failed', event);
  }
});

// Order Service listens for failures
eventBus.subscribe('payment.failed', async (event) => {
  await cancelOrder(event.orderId); // Compensating transaction
});
```

**Pros:** Simple, decoupled, no single point of failure
**Cons:** Hard to track flow, complex debugging

### 2. Orchestration (Central Coordinator)
A saga orchestrator tells services what to do.

```javascript
// Saga Orchestrator
class OrderSaga {
  async execute(orderData) {
    const sagaLog = [];
    
    try {
      // Step 1: Create Order
      const order = await orderService.create(orderData);
      sagaLog.push({ step: 'order', action: 'create', id: order.id });
      
      // Step 2: Process Payment
      const payment = await paymentService.charge(order);
      sagaLog.push({ step: 'payment', action: 'charge', id: payment.id });
      
      // Step 3: Reserve Inventory
      await inventoryService.reserve(order.items);
      sagaLog.push({ step: 'inventory', action: 'reserve' });
      
      // Step 4: Schedule Shipping
      await shippingService.schedule(order);
      sagaLog.push({ step: 'shipping', action: 'schedule' });
      
      return { success: true, order };
      
    } catch (error) {
      await this.compensate(sagaLog);
      throw error;
    }
  }
  
  async compensate(sagaLog) {
    // Execute in reverse order
    for (const step of sagaLog.reverse()) {
      switch (step.step) {
        case 'shipping':
          await shippingService.cancel(step.id);
          break;
        case 'inventory':
          await inventoryService.release(step.id);
          break;
        case 'payment':
          await paymentService.refund(step.id);
          break;
        case 'order':
          await orderService.cancel(step.id);
          break;
      }
    }
  }
}
```

**Pros:** Easy to understand, centralized logic, better monitoring
**Cons:** Single point of failure, tighter coupling

## Compensating Transactions

Each action needs a compensating action:

| Action | Compensation |
|--------|-------------|
| Create Order | Cancel Order |
| Charge Payment | Refund Payment |
| Reserve Inventory | Release Inventory |
| Schedule Shipping | Cancel Shipping |

## Best Practices

### 1. Idempotency
Make operations safe to retry:
```javascript
async function chargePayment(orderId, idempotencyKey) {
  const existing = await db.payments.findByIdempotencyKey(idempotencyKey);
  if (existing) return existing; // Already processed
  
  // Process payment...
}
```

### 2. Saga State Machine
Track saga progress:
```
STARTED → ORDER_CREATED → PAYMENT_PROCESSED → INVENTORY_RESERVED → COMPLETED
                ↓                ↓                    ↓
          COMPENSATING ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ↓
                ↓
            CANCELLED
```

### 3. Timeout Handling
```javascript
const sagaWithTimeout = async (saga, timeout) => {
  return Promise.race([
    saga.execute(),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Saga timeout')), timeout)
    )
  ]);
};
```

## When to Use Saga?
- Business transactions spanning multiple services
- Long-running transactions
- When you need eventual consistency
- When rollback logic is complex
"""
    },
    {
        "title": "Apache Kafka: Event Streaming Platform",
        "tags": ["Kafka", "Event Streaming", "Messaging", "Microservices"],
        "content": """# Apache Kafka

## What is Kafka?
Apache Kafka is a distributed event streaming platform. It's used for building real-time data pipelines and streaming applications.

## Core Concepts

### 1. Topics
A topic is a category/feed of messages. Like a table in a database.

```
Topic: user-events
├── Partition 0: [msg1, msg4, msg7...]
├── Partition 1: [msg2, msg5, msg8...]
└── Partition 2: [msg3, msg6, msg9...]
```

### 2. Partitions
Topics are split into partitions for parallelism:
- Each partition is ordered
- Messages have an offset (position)
- Partitions can be on different brokers

### 3. Producers & Consumers
```
Producer → Topic → Consumer Group
                   ├── Consumer 1 (Partition 0)
                   ├── Consumer 2 (Partition 1)
                   └── Consumer 3 (Partition 2)
```

### 4. Consumer Groups
- Consumers in same group split partitions
- Each partition → one consumer
- More consumers than partitions? Some idle.

## Architecture

```
┌─────────────────────────────────────────────┐
│              Kafka Cluster                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
│  │ Broker 1│  │ Broker 2│  │ Broker 3│     │
│  │(Leader) │  │(Follower)│ │(Follower)│     │
│  └─────────┘  └─────────┘  └─────────┘     │
│              ↑                              │
│         ZooKeeper / KRaft                   │
└─────────────────────────────────────────────┘
```

## Code Examples

### Producer (Node.js)
```javascript
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function sendMessage() {
  await producer.connect();
  
  await producer.send({
    topic: 'user-events',
    messages: [
      {
        key: 'user-123',
        value: JSON.stringify({
          type: 'USER_CREATED',
          userId: '123',
          email: 'user@example.com',
          timestamp: Date.now()
        })
      }
    ]
  });
  
  await producer.disconnect();
}
```

### Consumer (Node.js)
```javascript
const consumer = kafka.consumer({ groupId: 'user-service' });

async function startConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: true });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log({
        partition,
        offset: message.offset,
        key: message.key?.toString(),
        event
      });
      
      // Process the event
      await processUserEvent(event);
    }
  });
}
```

## Topic Configuration

```bash
# Create topic
kafka-topics.sh --create \\
  --topic user-events \\
  --bootstrap-server localhost:9092 \\
  --partitions 3 \\
  --replication-factor 2

# List topics
kafka-topics.sh --list --bootstrap-server localhost:9092

# Describe topic
kafka-topics.sh --describe --topic user-events --bootstrap-server localhost:9092
```

## Key Configurations

| Config | Description | Typical Value |
|--------|-------------|---------------|
| `retention.ms` | How long to keep messages | 604800000 (7 days) |
| `retention.bytes` | Max size per partition | -1 (unlimited) |
| `num.partitions` | Default partitions | 3 |
| `replication.factor` | Copies of data | 3 |

## Use Cases

### 1. Event Sourcing
Store all events as source of truth:
```
OrderCreated → ItemAdded → ItemRemoved → OrderCompleted
```

### 2. Log Aggregation
Collect logs from all services:
```
Service A ─┐
Service B ─┼─→ Kafka → Elasticsearch
Service C ─┘
```

### 3. Stream Processing
Real-time data transformation:
```
Raw Events → Kafka → Kafka Streams → Aggregated Data → Kafka
```

## Best Practices

1. **Choose partition key wisely**
   - Same key → same partition → ordering guaranteed
   - Example: user_id for user events

2. **Set appropriate retention**
   - Balance between replay ability and storage

3. **Monitor lag**
   - Consumer lag = producer offset - consumer offset
   - High lag = consumer can't keep up

4. **Handle failures**
   ```javascript
   // Dead Letter Queue for failed messages
   try {
     await processMessage(message);
   } catch (error) {
     await producer.send({
       topic: 'user-events-dlq',
       messages: [message]
     });
   }
   ```

5. **Idempotent consumers**
   - Messages may be delivered more than once
   - Use idempotency keys or deduplication

## Quick Reference
| Command | Purpose |
|---------|---------|
| `kafka-console-producer.sh` | Send messages from CLI |
| `kafka-console-consumer.sh` | Read messages from CLI |
| `kafka-consumer-groups.sh` | Manage consumer groups |
| `kafka-topics.sh` | Manage topics |
"""
    },
]


async def seed_database():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DATABASE_NAME]
    
    # Create a default author
    author = await db.users.find_one({"email": "admin@techblog.com"})
    if not author:
        import bcrypt
        hashed = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        result = await db.users.insert_one({
            "name": "Tech Admin",
            "email": "admin@techblog.com",
            "password": hashed,
        })
        author_id = str(result.inserted_id)
        author_name = "Tech Admin"
    else:
        author_id = str(author["_id"])
        author_name = author["name"]
    
    # Insert blogs
    now = datetime.utcnow()
    for i, blog in enumerate(BLOGS):
        existing = await db.blogs.find_one({"title": blog["title"]})
        if existing:
            print(f"Skipping: {blog['title']} (already exists)")
            continue
        
        await db.blogs.insert_one({
            "title": blog["title"],
            "content": blog["content"],
            "tags": blog["tags"],
            "author": author_name,
            "author_id": author_id,
            "created_at": now,
            "updated_at": now,
        })
        print(f"Added: {blog['title']}")
    
    print("\n✅ Seeding complete!")
    print(f"Admin login: admin@techblog.com / admin123")


if __name__ == "__main__":
    asyncio.run(seed_database())

