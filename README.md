# Person Management System - Full Stack PERN

A complete full-stack application built with **React, Express.js, Node.js, and MySQL** (PERN stack) with Docker containerization and Kubernetes orchestration.

## 📋 Table of Contents

- [Features](#-features)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Docker Compose Setup](#-docker-compose-setup)
- [Kubernetes Deployment](#-kubernetes-deployment)
- [Troubleshooting](#-troubleshooting)

## 🎯 Features

### Frontend (React)
- ✨ Beautiful, responsive UI with modern gradient design
- 📱 Mobile-friendly layout with responsive grid
- ⚡ Real-time API health monitoring with status indicators
- 🔄 Automatic health checks every 5 seconds
- 🎯 Form validation with error messages
- ✏️ Full CRUD operations (Create, Read, Update, Delete)
- 📋 Interactive table view with inline edit/delete buttons
- 🎨 Smooth animations and transitions

### Backend (Node.js + Express)
- 🚀 RESTful API with comprehensive CRUD endpoints
- 🗄️ MySQL database integration with automatic schema creation
- 📝 CORS support for cross-origin requests
- 🔍 Request logging with Morgan middleware
- ✅ Comprehensive unit tests using Node's built-in test runner
- 📊 Code coverage reporting with c8
- 🔐 Environment variable configuration

### Deployment
- 🐳 Multistage Docker builds for optimized images
- ☸️ Production-ready Kubernetes manifests
- 🌐 Nginx ingress with path-based routing
- 📦 Docker Compose for local development
- 🔌 Frontend proxy configuration for seamless API calls
- 📈 Horizontal Pod Autoscaling (HPA) for backend

## 📁 Project Structure

```
e2e-fullstack-pern/
├── backend/
│   ├── dockerfile                    # Multistage Docker image
│   ├── index.js                      # Express server with MySQL
│   ├── package.json                  # Node dependencies
│   ├── test.js                       # Unit tests
│   ├── testApiEndpoint.sh            # Manual API testing script
│   ├── docker-local.sh               # Local MySQL container script
│   ├── .dockerignore                 # Docker build exclusions
│   ├── .gitignore                    # Git exclusions
│   └── coverage/                     # Test coverage reports
│
├── frontend/
│   ├── Dockerfile                    # Multistage React build
│   ├── package.json                  # React dependencies
│   ├── public/
│   │   └── index.html                # HTML template
│   └── src/
│       ├── App.js                    # Main app component
│       ├── App.css                   # App styles
│       ├── index.js                  # React entry point
│       ├── axiosConfig.js            # Axios base configuration
│       └── components/
│           ├── PersonForm.js         # Add/Edit person form
│           ├── PersonForm.css
│           ├── PersonList.js         # People table display
│           ├── PersonList.css
│           ├── HealthCheck.js        # API health indicator
│           └── HealthCheck.css
│
├── manifest/
│   ├── 00-namespace.yaml             # K8s namespace
│   ├── 01-db.yaml                    # MySQL secret, PVC, service, deployment
│   ├── 02-backend.yaml               # Backend configmap, deployment, service, HPA
│   ├── 03-frontend.yaml              # Frontend deployment, service
│   ├── 04-ingress.yaml               # Nginx ingress with path routing
│   ├── 05-ingress-deploy.yaml        # Nginx controller deployment
│   ├── kind-cluster.yaml             # Kind cluster config
│   └── sample-hello-app.yaml         # Example app for testing ingress
│
├── docker-compose.yml                # Local development orchestration
├── .gitignore                        # Git exclusions (root level)
├── README.md                         # This file
├── readme.md                         # Notes file
└── usefullcmds.md                    # Useful commands reference
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended for Local Development)

**Prerequisites:**
- Docker and Docker Compose installed
- WSL2 or Linux environment
- Ports 3000, 3001, 3306 available

**Steps:**

```bash
# Navigate to project root
cd e2e-fullstack-pern

# Start all services
docker-compose up --build

# Wait for all services to be healthy (2-3 minutes)

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# MySQL: localhost:3306 (user: person_user / password: password123)
```

**Verify services are running:**
```bash
docker-compose ps
# All services should have status "Up"

# View logs
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql

# Stop services
docker-compose down

# Stop and remove all data
docker-compose down -v
```

### Option 2: Kubernetes Deployment

**Prerequisites:**
- Kubernetes cluster (Kind, Minikube, or managed cluster)
- kubectl configured
- Docker installed
- Nginx Ingress Controller installed (or deploy via manifests)

**Steps:**

```bash
# Navigate to manifest directory
cd manifest

# Create namespace and deploy all resources
kubectl apply -f 00-namespace.yaml
kubectl apply -f 01-db.yaml
kubectl apply -f 02-backend.yaml
kubectl apply -f 03-frontend.yaml

# Deploy Nginx Ingress (if not already installed)
kubectl apply -f 05-ingress-deploy.yaml

# Deploy ingress routing
kubectl apply -f 04-ingress.yaml

# Verify deployment
kubectl get all -n person-app

# Check ingress
kubectl get ingress -n person-app
```

**Access the application:**
```bash
# Add to /etc/hosts (or C:\Windows\System32\drivers\etc\hosts on Windows)
127.0.0.1  person.local.com

# Access via browser
http://person.local.com
```

**Port forwarding for local access:**
```bash
# Frontend
kubectl port-forward svc/frontend-service 3000:3000 -n person-app

# Backend
kubectl port-forward svc/backend-service 3001:3000 -n person-app

# MySQL
kubectl port-forward svc/mysql-service 3306:3306 -n person-app
```

## 📚 API Documentation

### Base URLs
- **Local (Docker Compose):** `http://localhost:3001`
- **Local (Kubernetes):** `http://person.local.com/api`

### Endpoints

#### 1. Health Check
```
GET /
Response: {"message":"API is working"}
Status: 200
```

#### 2. Get All Persons
```
GET /api/person
Response: [{"id":1,"name":"John Doe","email":"john@example.com"}]
Status: 200
```

#### 3. Get Person by ID
```
GET /api/person/:id
Response: {"id":1,"name":"John Doe","email":"john@example.com"}
Status: 200
```

#### 4. Create Person
```
POST /api/person
Content-Type: application/json

Request:
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

Response:
{
  "id": 2
}
Status: 201
```

#### 5. Update Person
```
PUT /api/person/:id
Content-Type: application/json

Request:
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com"
}

Response:
{
  "message": "Updated"
}
Status: 200
```

#### 6. Delete Person
```
DELETE /api/person/:id
Response: {"message":"Deleted"}
Status: 200
```

### Example API Calls

**Using curl:**
```bash
# Get all persons
curl http://localhost:3001/api/person

# Create a new person
curl -X POST http://localhost:3001/api/person \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Get specific person
curl http://localhost:3001/api/person/1

# Update person
curl -X PUT http://localhost:3001/api/person/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice@newemail.com"}'

# Delete person
curl -X DELETE http://localhost:3001/api/person/1
```

**Using the testing script:**
```bash
cd backend
chmod +x testApiEndpoint.sh

# Interactive mode
./testApiEndpoint.sh -u http://localhost:3001

# Auto mode (runs full test suite)
./testApiEndpoint.sh -u http://localhost:3001 --auto
```

## 🐳 Docker Compose Setup

### Services

#### MySQL Service
```yaml
Image: mysql:8.0
Port: 3306 (external)
Environment:
  - MYSQL_ROOT_PASSWORD: root
  - MYSQL_DATABASE: person_db
  - MYSQL_USER: person_user
  - MYSQL_PASSWORD: password123
Volume: mysql_data (persistent)
Health Check: mysqladmin ping
```

#### Backend Service
```yaml
Build: ./backend (multistage)
Port: 3001 (maps to internal 3000)
Environment:
  - DB_HOST: mysql
  - DB_PORT: 3306
  - DB_NAME: person_db
  - DB_USER: person_user
  - NODE_ENV: development
Depends On: mysql (healthy)
Health Check: http://localhost:3000
```

#### Frontend Service
```yaml
Build: ./frontend (multistage)
Port: 3000 (external and internal)
Depends On: backend
Network: person-app-network (bridge)
```

### Commands

```bash
# Start services in background
docker-compose up -d

# Start with logs visible
docker-compose up

# Rebuild images
docker-compose build --no-cache

# View logs
docker-compose logs -f service_name

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Execute command in container
docker-compose exec backend npm test
docker-compose exec mysql mysql -u root -proot
```

## ☸️ Kubernetes Deployment

### Architecture

```
┌─────────────────────────────────────────┐
│         Ingress (person.local.com)      │
│              (Nginx Router)             │
└────────────┬───────────────────────┬────┘
             │                       │
        /api path              / path
             │                       │
      ┌──────▼──────┐        ┌──────▼──────┐
      │   Backend   │        │  Frontend   │
      │  Service    │        │  Service    │
      │  :3000      │        │  :3000      │
      └──────┬──────┘        └──────┬──────┘
             │                       │
      ┌──────▼──────┐        ┌──────▼──────┐
      │ Backend Pod │        │Frontend Pod │
      │  (replica1) │        │ (replica1)  │
      │ Backend Pod │        │Frontend Pod │
      │  (replica2) │        │ (replica2)  │
      └──────┬──────┘        └─────────────┘
             │
      ┌──────▼──────────┐
      │  MySQL Service  │
      │     :3306       │
      └──────┬──────────┘
             │
      ┌──────▼──────┐
      │  MySQL Pod  │
      │   (single)  │
      └─────────────┘
```

### Manifest Files

| File | Purpose |
|------|---------|
| `00-namespace.yaml` | Creates `person-app` namespace |
| `01-db.yaml` | MySQL secret, PVC, service, deployment |
| `02-backend.yaml` | Backend configmap, deployment (2 replicas), service, HPA (2-30 replicas) |
| `03-frontend.yaml` | Frontend deployment (2 replicas), service |
| `04-ingress.yaml` | Nginx ingress with routing rules |
| `05-ingress-deploy.yaml` | Nginx ingress controller deployment |

### Deployment Commands

```bash
# Apply namespace
kubectl apply -f 00-namespace.yaml

# Check namespace
kubectl get namespace person-app

# Deploy database
kubectl apply -f 01-db.yaml
kubectl get all -n person-app

# Deploy backend
kubectl apply -f 02-backend.yaml

# Deploy frontend
kubectl apply -f 03-frontend.yaml

# Deploy ingress
kubectl apply -f 05-ingress-deploy.yaml
kubectl apply -f 04-ingress.yaml

# View all resources
kubectl get all -n person-app

# Delete all resources
kubectl delete namespace person-app
```

### Viewing Logs

```bash
# Frontend logs
kubectl logs -f deployment/frontend -n person-app

# Backend logs
kubectl logs -f deployment/backend -n person-app

# MySQL logs
kubectl logs -f deployment/mysql -n person-app

# View logs from specific pod
kubectl logs pod-name -n person-app

# Stream logs from pod
kubectl logs -f pod-name -n person-app
```

### Scaling

```bash
# Scale frontend to 3 replicas
kubectl scale deployment frontend --replicas=3 -n person-app

# Scale backend to 5 replicas
kubectl scale deployment backend --replicas=5 -n person-app

# View HPA status
kubectl get hpa -n person-app
kubectl describe hpa backend-hpa -n person-app
```

## 🧪 Testing

### Running Unit Tests

```bash
# Navigate to backend
cd backend

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# View coverage reports
cat coverage/index.html
```

### Testing API Endpoints

```bash
# Using the provided test script
cd backend
chmod +x testApiEndpoint.sh

# Interactive menu
./testApiEndpoint.sh -u http://localhost:3001

# Auto test (recommended)
./testApiEndpoint.sh -u http://localhost:3001 --auto
```

### Manual Testing

```bash
# Health check
curl http://localhost:3001/

# Create test person
curl -X POST http://localhost:3001/api/person \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Verify creation
curl http://localhost:3001/api/person

# Test update
curl -X PUT http://localhost:3001/api/person/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","email":"updated@example.com"}'

# Test delete
curl -X DELETE http://localhost:3001/api/person/1
```

## 🔧 Configuration

### Frontend Proxy (Development)

In `frontend/package.json`:
```json
"proxy": "http://localhost:3001"
```

This allows:
```javascript
// Automatically proxies to http://localhost:3001/api/person
axios.get('/api/person')
```

### Axios Configuration

Frontend uses `src/axiosConfig.js` for API calls:
```javascript
// Development: Uses full URL if REACT_APP_API_URL is set
// Production: Uses relative paths /api
```

### Environment Variables

**Backend (from Kubernetes ConfigMap):**
```
DB_HOST=mysql-service
DB_PORT=3306
DB_NAME=person_db
DB_USER=person_user
NODE_ENV=production
```

**Backend (from Secret):**
```
DB_ROOT_PASSWORD=password123
```

**MySQL:**
```
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=person_db
MYSQL_USER=person_user
MYSQL_PASSWORD=password123
```

## 🐛 Troubleshooting

### Docker Compose Issues

**Problem:** Services not connecting
```bash
# Check network
docker network ls
docker network inspect e2e-fullstack-pern_person-app-network

# Restart all services
docker-compose restart
```

**Problem:** Port conflicts
```bash
# Find process using port
lsof -i :3000
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
