# Person Management System - Full Stack PERN# Person Management System - Full Stack PERN



A complete full-stack application built with **React, Express.js, Node.js, and MySQL** (PERN stack) deployed on **Kubernetes with Nginx Ingress**.A complete full-stack application built with **React, Express.js, Node.js, and MySQL** (PERN stack) deployed on **Kubernetes with Nginx Ingress**.



## 📋 Table of Contents## 📋 Table of Contents



- [Features](#-features)- [Features](#-features)

- [Project Structure](#-project-structure)- [Project Structure](#-project-structure)

- [Getting Started](#-getting-started)- [Getting Started](#-getting-started)

- [Building Docker Images](#-building-docker-images)- [Building Docker Images](#-building-docker-images)

- [Kubernetes Deployment](#-kubernetes-deployment)- [Kubernetes Deployment](#-kubernetes-deployment)

- [API Documentation](#-api-documentation)- [API Documentation](#-api-documentation)

- [Troubleshooting](#-troubleshooting)- [Troubleshooting](#-troubleshooting)



## 🎯 Features## 🎯 Features



### Frontend (React)### Frontend (React)

- ✨ Beautiful, responsive UI with modern gradient design- ✨ Beautiful, responsive UI with modern gradient design

- 📱 Mobile-friendly layout- 📱 Mobile-friendly layout with responsive grid

- ⚡ Real-time API health monitoring- ⚡ Real-time API health monitoring with status indicators

- 🔄 Automatic health checks every 5 seconds- 🔄 Automatic health checks every 5 seconds

- 🎯 Form validation with error messages- 🎯 Form validation with error messages

- ✏️ Full CRUD operations (Create, Read, Update, Delete)- ✏️ Full CRUD operations (Create, Read, Update, Delete)

- 📋 Interactive table view- 📋 Interactive table view with inline edit/delete buttons

- 🎨 Smooth animations and transitions- 🎨 Smooth animations and transitions



### Backend (Node.js + Express)### Backend (Node.js + Express)

- 🚀 RESTful API with CRUD endpoints- 🚀 RESTful API with comprehensive CRUD endpoints

- 🗄️ MySQL database integration with auto schema creation- 🗄️ MySQL database integration with automatic schema creation

- 📝 CORS support- 📝 CORS support for cross-origin requests

- 🔍 Request logging with Morgan- 🔍 Request logging with Morgan middleware

- ✅ Comprehensive unit tests- ✅ Comprehensive unit tests using Node's built-in test runner

- 📊 Code coverage with c8- 📊 Code coverage reporting with c8

- 🔐 Environment configuration via ConfigMap & Secrets- 🔐 Environment variable configuration



### Kubernetes Deployment### Deployment

- ☸️ Complete Kubernetes manifests- 🐳 Multistage Docker builds for optimized images

- 🌐 Nginx ingress with path-based routing (`/api` for backend, `/` for frontend)- ☸️ Production-ready Kubernetes manifests

- 📈 Horizontal Pod Autoscaling (HPA) for backend (2-30 replicas)- 🌐 Nginx ingress with path-based routing

- 💾 MySQL with PersistentVolume for data persistence- 📦 Docker Compose for local development

- 🏥 Liveness and readiness probes for all services- 🔌 Frontend proxy configuration for seamless API calls

- 🔄 Rolling updates for zero-downtime deployments- 📈 Horizontal Pod Autoscaling (HPA) for backend



## 📁 Project Structure## 📁 Project Structure



``````

e2e-fullstack-pern/e2e-fullstack-pern/

├── backend/├── backend/

│   ├── dockerfile                    # Multistage Docker image│   ├── dockerfile                    # Multistage Docker image

│   ├── index.js                      # Express server with MySQL│   ├── index.js                      # Express server with MySQL

│   ├── package.json                  # Node dependencies│   ├── package.json                  # Node dependencies

│   ├── test.js                       # Unit tests│   ├── test.js                       # Unit tests

│   ├── testApiEndpoint.sh            # Manual API testing script│   ├── testApiEndpoint.sh            # Manual API testing script

│   ├── docker-local.sh               # Local MySQL container script│   ├── docker-local.sh               # Local MySQL container script

│   ├── .dockerignore                 # Docker build exclusions│   ├── .dockerignore                 # Docker build exclusions

│   ├── .gitignore                    # Git exclusions│   ├── .gitignore                    # Git exclusions

│   ├── package-lock.json│   └── coverage/                     # Test coverage reports

│   └── coverage/                     # Test coverage reports│

│├── frontend/

├── frontend/│   ├── Dockerfile                    # Multistage React build

│   ├── Dockerfile                    # Multistage React build│   ├── package.json                  # React dependencies

│   ├── package.json                  # React dependencies│   ├── public/

│   ├── package-lock.json│   │   └── index.html                # HTML template

│   ├── public/│   └── src/

│   │   └── index.html                # HTML template│       ├── App.js                    # Main app component

│   └── src/│       ├── App.css                   # App styles

│       ├── App.js                    # Main app component│       ├── index.js                  # React entry point

│       ├── App.css                   # App styles│       ├── axiosConfig.js            # Axios base configuration

│       ├── index.js                  # React entry point│       └── components/

│       ├── axiosConfig.js            # Axios base configuration│           ├── PersonForm.js         # Add/Edit person form

│       └── components/│           ├── PersonForm.css

│           ├── PersonForm.js         # Add/Edit person form│           ├── PersonList.js         # People table display

│           ├── PersonForm.css│           ├── PersonList.css

│           ├── PersonList.js         # People table display│           ├── HealthCheck.js        # API health indicator

│           ├── PersonList.css│           └── HealthCheck.css

│           ├── HealthCheck.js        # API health indicator│

│           └── HealthCheck.css├── manifest/

││   ├── 00-namespace.yaml             # K8s namespace

├── manifest/│   ├── 01-db.yaml                    # MySQL secret, PVC, service, deployment

│   ├── 00-namespace.yaml             # K8s namespace (person-app)│   ├── 02-backend.yaml               # Backend configmap, deployment, service, HPA

│   ├── 01-db.yaml                    # MySQL secret, PVC, service, deployment│   ├── 03-frontend.yaml              # Frontend deployment, service

│   ├── 02-backend.yaml               # Backend configmap, deployment (2 replicas), service, HPA│   ├── 04-ingress.yaml               # Nginx ingress with path routing

│   ├── 03-frontend.yaml              # Frontend deployment (2 replicas), service│   ├── 05-ingress-deploy.yaml        # Nginx controller deployment

│   ├── 04-ingress.yaml               # Nginx ingress with path-based routing│   ├── kind-cluster.yaml             # Kind cluster config

│   ├── 05-ingress-deploy.yaml        # Nginx controller full deployment│   └── sample-hello-app.yaml         # Example app for testing ingress

│   ├── kind-cluster.yaml             # Kind cluster configuration for local testing│

│   └── sample-hello-app.yaml         # Example app for testing ingress├── docker-compose.yml                # Local development orchestration

│├── .gitignore                        # Git exclusions (root level)

├── .gitignore                        # Git exclusions├── README.md                         # This file

├── README.md                         # This file├── readme.md                         # Notes file

├── readme.md                         # Project notes└── usefullcmds.md                    # Useful commands reference

└── usefullcmds.md                    # Useful kubectl commands reference```

```

## 🚀 Quick Start

## 🚀 Getting Started

### Option 1: Docker Compose (Recommended for Local Development)

### Prerequisites

**Prerequisites:**

- **Kubernetes Cluster** (Kind, Minikube, or managed cluster like EKS/GKE/AKS)- Docker and Docker Compose installed

- **kubectl** configured to access your cluster- WSL2 or Linux environment

- **Docker** installed (for building and pushing images)- Ports 3000, 3001, 3306 available

- **Docker registry access** (Docker Hub, ECR, GCR, or private registry)

**Steps:**

### Quick Test with Kind

```bash

If you don't have a Kubernetes cluster, create one with Kind:# Navigate to project root

cd e2e-fullstack-pern

```bash

# Create a Kind cluster# Start all services

kind create cluster --name person-app --config manifest/kind-cluster.yamldocker-compose up --build



# Set context# Wait for all services to be healthy (2-3 minutes)

kubectl cluster-info --context kind-person-app

```# Access the application

# Frontend: http://localhost:3000

## 🐳 Building Docker Images# Backend: http://localhost:3001

# MySQL: localhost:3306 (user: person_user / password: password123)

### Build Backend Image```



```bash**Verify services are running:**

cd backend```bash

docker build -f dockerfile -t your-registry/person-backend:latest .docker-compose ps

docker push your-registry/person-backend:latest# All services should have status "Up"

```

# View logs

### Build Frontend Imagedocker-compose logs -f frontend

docker-compose logs -f backend

```bashdocker-compose logs -f mysql

cd frontend

docker build -f Dockerfile -t your-registry/person-frontend:latest .# Stop services

docker push your-registry/person-frontend:latestdocker-compose down

```

# Stop and remove all data

### Update Kubernetes Manifestsdocker-compose down -v

```

Edit `manifest/02-backend.yaml` and `manifest/03-frontend.yaml` to use your registry:

### Option 2: Kubernetes Deployment

```yaml

# In 02-backend.yaml**Prerequisites:**

image: your-registry/person-backend:latest- Kubernetes cluster (Kind, Minikube, or managed cluster)

- kubectl configured

# In 03-frontend.yaml- Docker installed

image: your-registry/person-frontend:latest- Nginx Ingress Controller installed (or deploy via manifests)

```

**Steps:**

Or use local images (for Kind):

```bash

```bash# Navigate to manifest directory

# Load images into Kind cluster directlycd manifest

kind load docker-image person-backend:latest --name person-app

kind load docker-image person-frontend:latest --name person-app# Create namespace and deploy all resources

kubectl apply -f 00-namespace.yaml

# Update manifests to use local images:kubectl apply -f 01-db.yaml

# Change imagePullPolicy: Neverkubectl apply -f 02-backend.yaml

# Change image: person-backend:latest (without registry prefix)kubectl apply -f 03-frontend.yaml

```

# Deploy Nginx Ingress (if not already installed)

## ☸️ Kubernetes Deploymentkubectl apply -f 05-ingress-deploy.yaml



### Step 1: Create Namespace# Deploy ingress routing

kubectl apply -f 04-ingress.yaml

```bash

kubectl apply -f manifest/00-namespace.yaml# Verify deployment

kubectl get all -n person-app

# Verify

kubectl get namespace person-app# Check ingress

```kubectl get ingress -n person-app

```

### Step 2: Deploy Database (MySQL)

**Access the application:**

```bash```bash

kubectl apply -f manifest/01-db.yaml# Add to /etc/hosts (or C:\Windows\System32\drivers\etc\hosts on Windows)

127.0.0.1  person.local.com

# Verify

kubectl get all -n person-app# Access via browser

kubectl get pvc -n person-apphttp://person.local.com

``````



Wait for MySQL pod to be ready:**Port forwarding for local access:**

```bash```bash

kubectl wait --for=condition=ready pod -l app=mysql -n person-app --timeout=300s# Frontend

```kubectl port-forward svc/frontend-service 3000:3000 -n person-app



### Step 3: Deploy Backend# Backend

kubectl port-forward svc/backend-service 3001:3000 -n person-app

```bash

kubectl apply -f manifest/02-backend.yaml# MySQL

kubectl port-forward svc/mysql-service 3306:3306 -n person-app

# Verify```

kubectl get deployment,svc -n person-app

kubectl describe deployment backend -n person-app## 📚 API Documentation

```

### Base URLs

### Step 4: Deploy Frontend- **Local (Docker Compose):** `http://localhost:3001`

- **Local (Kubernetes):** `http://person.local.com/api`

```bash

kubectl apply -f manifest/03-frontend.yaml### Endpoints



# Verify#### 1. Health Check

kubectl get all -n person-app```

```GET /

Response: {"message":"API is working"}

### Step 5: Deploy Nginx Ingress Controller (if not installed)Status: 200

```

```bash

kubectl apply -f manifest/05-ingress-deploy.yaml#### 2. Get All Persons

```

# VerifyGET /api/person

kubectl get all -n ingress-nginxResponse: [{"id":1,"name":"John Doe","email":"john@example.com"}]

```Status: 200

```

### Step 6: Deploy Ingress Routing

#### 3. Get Person by ID

```bash```

kubectl apply -f manifest/04-ingress.yamlGET /api/person/:id

Response: {"id":1,"name":"John Doe","email":"john@example.com"}

# VerifyStatus: 200

kubectl get ingress -n person-app```

kubectl describe ingress person-app-ingress -n person-app

```#### 4. Create Person

```

### Verify Complete DeploymentPOST /api/person

Content-Type: application/json

```bash

# Check all resourcesRequest:

kubectl get all -n person-app{

  "name": "Jane Doe",

# Expected output:  "email": "jane@example.com"

# Namespace, ConfigMap, Secret, PVC}

# Services: mysql-service, backend-service, frontend-service

# Deployments: mysql, backend, frontendResponse:

# HPA: backend-hpa{

# Ingress: person-app-ingress  "id": 2

```}

Status: 201

## 🌐 Accessing the Application```



### Via Ingress (Recommended)#### 5. Update Person

```

1. **Add to `/etc/hosts`** (Linux/Mac/WSL):PUT /api/person/:id

```bashContent-Type: application/json

echo "127.0.0.1  person.local.com" | sudo tee -a /etc/hosts

```Request:

{

Or Windows (`C:\Windows\System32\drivers\etc\hosts`):  "name": "Jane Smith",

```  "email": "jane.smith@example.com"

127.0.0.1  person.local.com}

```

Response:

2. **Access via browser:**{

```  "message": "Updated"

http://person.local.com}

```Status: 200

```

### Via Port Forwarding (Alternative)

#### 6. Delete Person

```bash```

# FrontendDELETE /api/person/:id

kubectl port-forward svc/frontend-service 3000:3000 -n person-appResponse: {"message":"Deleted"}

# Access: http://localhost:3000Status: 200

```

# Backend

kubectl port-forward svc/backend-service 3001:3000 -n person-app### Example API Calls

# Access: http://localhost:3001

**Using curl:**

# MySQL```bash

kubectl port-forward svc/mysql-service 3306:3306 -n person-app# Get all persons

# Access: localhost:3306curl http://localhost:3001/api/person

```

# Create a new person

## 📚 API Documentationcurl -X POST http://localhost:3001/api/person \

  -H "Content-Type: application/json" \

### Base URL  -d '{"name":"Alice","email":"alice@example.com"}'

- **Via Ingress:** `http://person.local.com/api`

- **Via Port Forward:** `http://localhost:3001/api`# Get specific person

curl http://localhost:3001/api/person/1

### Endpoints

# Update person

#### Health Checkcurl -X PUT http://localhost:3001/api/person/1 \

```  -H "Content-Type: application/json" \

GET /  -d '{"name":"Alice Updated","email":"alice@newemail.com"}'

Response: {"message":"API is working"}

```# Delete person

curl -X DELETE http://localhost:3001/api/person/1

#### Get All Persons```

```

GET /api/person**Using the testing script:**

Response: [{"id":1,"name":"John Doe","email":"john@example.com"}]```bash

```cd backend

chmod +x testApiEndpoint.sh

#### Get Person by ID

```# Interactive mode

GET /api/person/:id./testApiEndpoint.sh -u http://localhost:3001

Response: {"id":1,"name":"John Doe","email":"john@example.com"}

```# Auto mode (runs full test suite)

./testApiEndpoint.sh -u http://localhost:3001 --auto

#### Create Person```

```

POST /api/person## 🐳 Docker Compose Setup

Content-Type: application/json

### Services

Request:

{#### MySQL Service

  "name": "Jane Doe",```yaml

  "email": "jane@example.com"Image: mysql:8.0

}Port: 3306 (external)

Environment:

Response: {"id":2}  - MYSQL_ROOT_PASSWORD: root

Status: 201  - MYSQL_DATABASE: person_db

```  - MYSQL_USER: person_user

  - MYSQL_PASSWORD: password123

#### Update PersonVolume: mysql_data (persistent)

```Health Check: mysqladmin ping

PUT /api/person/:id```

Content-Type: application/json

#### Backend Service

Request:```yaml

{Build: ./backend (multistage)

  "name": "Jane Smith",Port: 3001 (maps to internal 3000)

  "email": "jane.smith@example.com"Environment:

}  - DB_HOST: mysql

  - DB_PORT: 3306

Response: {"message":"Updated"}  - DB_NAME: person_db

```  - DB_USER: person_user

  - NODE_ENV: development

#### Delete PersonDepends On: mysql (healthy)

```Health Check: http://localhost:3000

DELETE /api/person/:id```

Response: {"message":"Deleted"}

```#### Frontend Service

```yaml

### Example RequestsBuild: ./frontend (multistage)

Port: 3000 (external and internal)

```bashDepends On: backend

# Get all personsNetwork: person-app-network (bridge)

curl http://person.local.com/api/person```



# Create person### Commands

curl -X POST http://person.local.com/api/person \

  -H "Content-Type: application/json" \```bash

  -d '{"name":"Alice","email":"alice@example.com"}'# Start services in background

docker-compose up -d

# Update person

curl -X PUT http://person.local.com/api/person/1 \# Start with logs visible

  -H "Content-Type: application/json" \docker-compose up

  -d '{"name":"Alice Updated","email":"alice@newemail.com"}'

# Rebuild images

# Delete persondocker-compose build --no-cache

curl -X DELETE http://person.local.com/api/person/1

```# View logs

docker-compose logs -f service_name

## 🧪 Testing

# Stop services

### Backend Unit Testsdocker-compose stop



```bash# Stop and remove containers

cd backenddocker-compose down



# Run tests# Remove containers and volumes

npm testdocker-compose down -v



# Run with coverage# Execute command in container

npm test -- --coveragedocker-compose exec backend npm test

```docker-compose exec mysql mysql -u root -proot

```

### API Endpoint Testing

## ☸️ Kubernetes Deployment

```bash

cd backend### Architecture



# Interactive mode```

chmod +x testApiEndpoint.sh┌─────────────────────────────────────────┐

./testApiEndpoint.sh -u http://person.local.com/api│         Ingress (person.local.com)      │

│              (Nginx Router)             │

# Automated mode└────────────┬───────────────────────┬────┘

./testApiEndpoint.sh -u http://person.local.com/api --auto             │                       │

```        /api path              / path

             │                       │

## 📊 Monitoring and Debugging      ┌──────▼──────┐        ┌──────▼──────┐

      │   Backend   │        │  Frontend   │

### View Logs      │  Service    │        │  Service    │

      │  :3000      │        │  :3000      │

```bash      └──────┬──────┘        └──────┬──────┘

# Frontend logs             │                       │

kubectl logs -f deployment/frontend -n person-app      ┌──────▼──────┐        ┌──────▼──────┐

      │ Backend Pod │        │Frontend Pod │

# Backend logs      │  (replica1) │        │ (replica1)  │

kubectl logs -f deployment/backend -n person-app      │ Backend Pod │        │Frontend Pod │

      │  (replica2) │        │ (replica2)  │

# MySQL logs      └──────┬──────┘        └─────────────┘

kubectl logs -f deployment/mysql -n person-app             │

      ┌──────▼──────────┐

# Specific pod logs      │  MySQL Service  │

kubectl logs -f pod-name -n person-app      │     :3306       │

```      └──────┬──────────┘

             │

### Resource Usage      ┌──────▼──────┐

      │  MySQL Pod  │

```bash      │   (single)  │

# Node resources      └─────────────┘

kubectl top nodes```



# Pod resources### Manifest Files

kubectl top pods -n person-app

```| File | Purpose |

|------|---------|

### Describe Resources| `00-namespace.yaml` | Creates `person-app` namespace |

| `01-db.yaml` | MySQL secret, PVC, service, deployment |

```bash| `02-backend.yaml` | Backend configmap, deployment (2 replicas), service, HPA (2-30 replicas) |

# Deployment details| `03-frontend.yaml` | Frontend deployment (2 replicas), service |

kubectl describe deployment backend -n person-app| `04-ingress.yaml` | Nginx ingress with routing rules |

| `05-ingress-deploy.yaml` | Nginx ingress controller deployment |

# Pod details

kubectl describe pod pod-name -n person-app### Deployment Commands



# Service details```bash

kubectl describe svc backend-service -n person-app# Apply namespace

```kubectl apply -f 00-namespace.yaml



### Scaling# Check namespace

kubectl get namespace person-app

```bash

# Scale frontend to 3 replicas# Deploy database

kubectl scale deployment frontend --replicas=3 -n person-appkubectl apply -f 01-db.yaml

kubectl get all -n person-app

# Scale backend manually (HPA will also manage this)

kubectl scale deployment backend --replicas=5 -n person-app# Deploy backend

kubectl apply -f 02-backend.yaml

# View HPA status

kubectl get hpa -n person-app# Deploy frontend

kubectl describe hpa backend-hpa -n person-appkubectl apply -f 03-frontend.yaml

```

# Deploy ingress

## 🐛 Troubleshootingkubectl apply -f 05-ingress-deploy.yaml

kubectl apply -f 04-ingress.yaml

### Problem: Pods not starting

# View all resources

```bashkubectl get all -n person-app

# Describe pod to see error

kubectl describe pod mysql-0 -n person-app# Delete all resources

kubectl delete namespace person-app

# View logs```

kubectl logs mysql-0 -n person-app

### Viewing Logs

# Check resource availability

kubectl describe node <node-name>```bash

```# Frontend logs

kubectl logs -f deployment/frontend -n person-app

### Problem: Backend can't connect to MySQL

# Backend logs

```bashkubectl logs -f deployment/backend -n person-app

# Verify MySQL service

kubectl get svc mysql-service -n person-app# MySQL logs

kubectl logs -f deployment/mysql -n person-app

# Port forward to test

kubectl port-forward svc/mysql-service 3306:3306 -n person-app# View logs from specific pod

kubectl logs pod-name -n person-app

# Test connection (in another terminal)

mysql -h 127.0.0.1 -u person_user -ppassword123 person_db# Stream logs from pod

```kubectl logs -f pod-name -n person-app

```

### Problem: Ingress not working

### Scaling

```bash

# Check ingress```bash

kubectl get ingress -n person-app# Scale frontend to 3 replicas

kubectl describe ingress person-app-ingress -n person-appkubectl scale deployment frontend --replicas=3 -n person-app



# Check Nginx controller# Scale backend to 5 replicas

kubectl get all -n ingress-nginxkubectl scale deployment backend --replicas=5 -n person-app

kubectl logs -f deployment/ingress-nginx-controller -n ingress-nginx

# View HPA status

# Verify DNSkubectl get hpa -n person-app

nslookup person.local.comkubectl describe hpa backend-hpa -n person-app

cat /etc/hosts | grep person.local.com```



# Port forward ingress controller## 🧪 Testing

kubectl port-forward svc/ingress-nginx-controller 80:80 -n ingress-nginx

```### Running Unit Tests



### Problem: Frontend can't reach backend```bash

# Navigate to backend

```bashcd backend

# Test from frontend pod

kubectl exec -it deployment/frontend -n person-app -- sh# Run tests

npm test

# Inside the pod, test backend connectivity

wget http://backend-service:3000/# Run tests with coverage

curl http://backend-service:3000/api/personnpm test -- --coverage

```

# View coverage reports

### Problem: DNS resolution issuescat coverage/index.html

```

```bash

# Restart CoreDNS### Testing API Endpoints

kubectl rollout restart deployment coredns -n kube-system

```bash

# Test DNS from pod# Using the provided test script

kubectl exec -it pod-name -n person-app -- nslookup backend-servicecd backend

```chmod +x testApiEndpoint.sh



## 📈 Performance Configuration# Interactive menu

./testApiEndpoint.sh -u http://localhost:3001

### Resources Set In Manifests

# Auto test (recommended)

| Component | CPU Request | Memory Request | CPU Limit | Memory Limit |./testApiEndpoint.sh -u http://localhost:3001 --auto

|-----------|-------------|-----------------|-----------|--------------|```

| Frontend | 100m | 128Mi | 500m | 256Mi |

| Backend | 100m | 128Mi | 500m | 256Mi |### Manual Testing

| MySQL | 250m | 256Mi | 500m | 512Mi |

```bash

### HPA Configuration (Backend)# Health check

curl http://localhost:3001/

- **Min Replicas:** 2

- **Max Replicas:** 30# Create test person

- **Target CPU Utilization:** 60%curl -X POST http://localhost:3001/api/person \

  -H "Content-Type: application/json" \

The backend automatically scales based on CPU usage.  -d '{"name":"Test User","email":"test@example.com"}'



## 🔐 Security Considerations# Verify creation

curl http://localhost:3001/api/person

### Current Setup (Development)

- Default passwords in Secrets# Test update

- CORS enabled globallycurl -X PUT http://localhost:3001/api/person/1 \

- No HTTPS/TLS  -H "Content-Type: application/json" \

  -d '{"name":"Updated","email":"updated@example.com"}'

### For Production

# Test delete

1. **Change default passwords:**curl -X DELETE http://localhost:3001/api/person/1

   - Update `MYSQL_ROOT_PASSWORD` in `manifest/01-db.yaml````

   - Use strong passwords (min 16 characters)

## 🔧 Configuration

2. **Enable HTTPS/TLS:**

   - Install cert-manager### Frontend Proxy (Development)

   - Configure Let's Encrypt

   - Update ingress with TLSIn `frontend/package.json`:

```json

3. **Network Policies:**"proxy": "http://localhost:3001"

   - Restrict pod-to-pod communication```

   - Only allow necessary traffic

This allows:

4. **RBAC:**```javascript

   - Create service accounts with minimal permissions// Automatically proxies to http://localhost:3001/api/person

   - Bind appropriate rolesaxios.get('/api/person')

```

5. **Image Security:**

   - Use private registry### Axios Configuration

   - Scan images for vulnerabilities

   - Use image signingFrontend uses `src/axiosConfig.js` for API calls:

```javascript

6. **Database:**// Development: Uses full URL if REACT_APP_API_URL is set

   - Use managed database service// Production: Uses relative paths /api

   - Enable encryption at rest```

   - Regular backups

### Environment Variables

## 🗑️ Cleanup

**Backend (from Kubernetes ConfigMap):**

To delete all resources:```

DB_HOST=mysql-service

```bashDB_PORT=3306

# Delete everything in person-app namespaceDB_NAME=person_db

kubectl delete namespace person-appDB_USER=person_user

NODE_ENV=production

# Delete ingress namespace (if you installed it)```

kubectl delete namespace ingress-nginx

**Backend (from Secret):**

# Delete Kind cluster (if using Kind)```

kind delete cluster --name person-appDB_ROOT_PASSWORD=password123

``````



## 📝 Useful Commands**MySQL:**

```

See `usefullcmds.md` for more kubectl commands and tips.MYSQL_ROOT_PASSWORD=root

MYSQL_DATABASE=person_db

## 📖 ResourcesMYSQL_USER=person_user

MYSQL_PASSWORD=password123

- [Kubernetes Documentation](https://kubernetes.io/docs)```

- [Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress)

- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx)## 🐛 Troubleshooting

- [Kind](https://kind.sigs.k8s.io)

- [React](https://react.dev)### Docker Compose Issues

- [Express.js](https://expressjs.com)

- [MySQL](https://www.mysql.com)**Problem:** Services not connecting

```bash

## 📄 License# Check network

docker network ls

MIT Licensedocker network inspect e2e-fullstack-pern_person-app-network



## 🤝 Support# Restart all services

docker-compose restart

For issues, check the Troubleshooting section or create an issue in the repository.```



---**Problem:** Port conflicts

```bash

**Last Updated:** December 23, 2025# Find process using port

**Repository:** https://github.com/Manjunath728/ingress-projectlsof -i :3000

lsof -i :3001
lsof -i :3306

# Kill process if needed
kill -9 <PID>
```

**Problem:** Database connection failed
```bash
# Check MySQL logs
docker-compose logs mysql

# Verify environment variables
docker-compose exec backend env | grep DB_

# Test database connection
docker-compose exec mysql mysql -u person_user -ppassword123 -e "SELECT 1"
```

### Kubernetes Issues

**Problem:** Pods not starting
```bash
# Describe pod to see errors
kubectl describe pod <pod-name> -n person-app

# View pod logs
kubectl logs <pod-name> -n person-app

# Check resource availability
kubectl top nodes
kubectl describe node <node-name>
```

**Problem:** Backend can't connect to MySQL
```bash
# Verify MySQL service is running
kubectl get svc -n person-app

# Port forward to test connection
kubectl port-forward svc/mysql-service 3306:3306 -n person-app

# Test in another terminal
mysql -h 127.0.0.1 -u root -proot person_db
```

**Problem:** Ingress not accessible
```bash
# Check ingress configuration
kubectl get ingress -n person-app
kubectl describe ingress person-app-ingress -n person-app

# Check host file
cat /etc/hosts | grep person.local.com

# Check Nginx controller logs
kubectl logs -f deployment/ingress-nginx-controller -n ingress-nginx

# Test DNS resolution
nslookup person.local.com
```

**Problem:** Frontend can't reach backend
```bash
# Check backend service
kubectl get svc backend-service -n person-app

# Port forward backend
kubectl port-forward svc/backend-service 3001:3000 -n person-app

# Test API from pod
kubectl exec -it deployment/frontend -n person-app -- sh
wget http://backend-service:3000/
```

## 📊 Monitoring

### Resource Monitoring

```bash
# Monitor nodes
kubectl top nodes --watch

# Monitor pods
kubectl top pods -n person-app --watch

# Monitor specific pod
kubectl top pod <pod-name> -n person-app
```

### Health Checks

**Frontend Health Check (in browser):**
- Green indicator (🟢) = API is reachable
- Red indicator (🔴) = API is unreachable
- Yellow indicator (🟡) = Checking...

**Backend Health Check:**
```bash
# Kubernetes
kubectl get deployment backend -n person-app

# Docker Compose
docker-compose ps backend
```

### View Events

```bash
# Recent events
kubectl get events -n person-app

# Watch events
kubectl get events -n person-app --watch

# Detailed events
kubectl describe all -n person-app
```

## 📈 Performance Optimization

### Frontend Optimization
- Multistage Docker build reduces image size
- Serve static files with compression
- Component lazy loading supported

### Backend Optimization
- Database connection pooling
- Request logging with Morgan
- Environment-based configuration

### Kubernetes Optimization
- Horizontal Pod Autoscaling (HPA) for backend (2-30 replicas at 60% CPU)
- Resource requests and limits set
- Liveness and readiness probes configured
- Rolling updates for zero-downtime deployments

## 🔐 Security Notes

### Current Setup (Development)
- Default passwords used
- CORS enabled for all origins
- No HTTPS/TLS

### Production Recommendations
1. Change all default passwords and secrets
2. Use strong passwords (min 16 characters)
3. Implement HTTPS/TLS with Let's Encrypt
4. Use secret management (Vault, AWS Secrets Manager)
5. Implement network policies
6. Enable RBAC on Kubernetes
7. Regular security scanning
8. Database encryption at rest
9. API rate limiting and throttling
10. Input validation and sanitization

## 🚢 Deployment Checklist

- [ ] Update database credentials in secrets
- [ ] Configure DNS records
- [ ] Set up SSL/TLS certificates
- [ ] Configure backup strategy
- [ ] Set up monitoring and logging
- [ ] Configure resource limits
- [ ] Test health checks
- [ ] Configure autoscaling policies
- [ ] Set up CI/CD pipeline
- [ ] Document runbooks

## 📖 Useful Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Node.js Documentation](https://nodejs.org/docs)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Documentation](https://kubernetes.io/docs)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx)

## 📝 Notes

See `usefullcmds.md` for additional useful commands and `readme.md` for project notes.

## 📄 License

MIT License - Feel free to use this project as a template for your applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Last Updated:** December 23, 2025
**Repository:** https://github.com/Manjunath728/ingress-project
