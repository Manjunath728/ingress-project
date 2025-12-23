# Person Management System - Full Stack PERN

A complete full-stack application built with React, Express.js, Node.js, and MySQL (PERN stack) with Docker containerization and Kubernetes orchestration.

## 🎯 Features

### Frontend (React)
- ✨ Beautiful, responsive UI with modern design
- 🎨 Gradient backgrounds and smooth animations
- 📱 Mobile-friendly layout
- ⚡ Real-time API status monitoring
- 🔄 Automatic health checks
- 🎯 Form validation and error handling
- ✏️ Full CRUD operations (Create, Read, Update, Delete)
- 📋 Table view with sorting and filtering capability

### Backend (Node.js + Express)
- 🚀 RESTful API endpoints
- 🗄️ MySQL database integration
- 📝 CORS support
- 🔍 Request logging with Morgan
- ✅ Comprehensive API testing included
- 🔐 Environment variable configuration

### Deployment
- 🐳 Docker images for frontend, backend, and database
- ☸️ Complete Kubernetes manifests
- 🌐 Nginx ingress with path-based routing
- 📦 Docker Compose for local development
- 🔌 Proxy configuration for development

## 📁 Project Structure

```
e2e-fullstack-pern/
├── backend/
│   ├── Dockerfile               # Development Docker image
│   ├── Dockerfile.prod          # Production Docker image
│   ├── index.js                 # Express server
│   ├── package.json             # Node dependencies
│   ├── test.js                  # API tests
│   ├── testApiEndpoint.sh       # Manual API testing script
│   └── coverage/                # Test coverage reports
├── frontend/
│   ├── Dockerfile               # React Docker image
│   ├── package.json             # React dependencies with proxy
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js               # Main app component
│       ├── App.css              # App styles
│       ├── index.js             # React entry point
│       └── components/
│           ├── PersonForm.js    # Form component
│           ├── PersonForm.css
│           ├── PersonList.js    # List component
│           ├── PersonList.css
│           ├── HealthCheck.js   # Status component
│           └── HealthCheck.css
├── manifest/
│   ├── 00-namespace.yaml
│   ├── 01-configmap-backend.yaml
│   ├── 02-secret-mysql.yaml
│   ├── 03-pvc-mysql.yaml
│   ├── 04-service-mysql.yaml
│   ├── 05-deployment-mysql.yaml
│   ├── 06-service-backend.yaml
│   ├── 07-deployment-backend.yaml
│   ├── 08-service-frontend.yaml
│   ├── 09-deployment-frontend.yaml
│   ├── 10-ingress.yaml
│   ├── 11-configmap-nginx.yaml
│   ├── 12-service-nginx.yaml
│   ├── 13-deployment-nginx.yaml
│   ├── build-images.sh
│   ├── deploy.sh
│   ├── remove.sh
│   └── README.md
├── docker-compose.yml           # Local development setup
├── nginx.conf                   # Nginx configuration
└── README.md                    # This file
```

## 🚀 Quick Start

### Option 1: Docker Compose (Local Development)

**Prerequisites:**
- Docker and Docker Compose installed
- Port 80, 3306, 3001, 3002 available

**Steps:**

```bash
# Clone/Navigate to the project
cd e2e-fullstack-pern

# Start all services
docker-compose up -d

# Wait for services to be healthy
docker-compose ps

# Access the application
# Frontend: http://localhost:3002
# Backend: http://localhost:3001
# Via Nginx: http://localhost (requires person.app.com in /etc/hosts)
```

**Useful commands:**

```bash
# View logs
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f mysql

# Stop services
docker-compose down

# Rebuild images
docker-compose build --no-cache
```

### Option 2: Kubernetes Deployment

**Prerequisites:**
- Kubernetes cluster (v1.19+)
- kubectl configured
- Docker installed
- Nginx Ingress Controller (if not using existing)

**Steps:**

```bash
cd manifest

# Build Docker images
chmod +x build-images.sh
./build-images.sh

# Deploy to Kubernetes
chmod +x deploy.sh
./deploy.sh

# Access the application
# http://person.app.com
```

**Setup local DNS (WSL/Linux):**
```bash
echo "127.0.0.1 person.app.com" | sudo tee -a /etc/hosts
```

## 📚 API Documentation

### Base URL
- Local: `http://localhost:3001/api`
- Kubernetes: `http://person.app.com/api`

### Endpoints

#### 1. Health Check
```bash
GET /
# Response: {"message":"API is working"}
```

#### 2. Get All Persons
```bash
GET /api/person
# Response: [{"id":1,"name":"John Doe","email":"john@example.com"}, ...]
```

#### 3. Get Person by ID
```bash
GET /api/person/:id
# Response: {"id":1,"name":"John Doe","email":"john@example.com"}
```

#### 4. Create Person
```bash
POST /api/person
# Request body: {"name":"Jane Doe","email":"jane@example.com"}
# Response: {"id":2}
```

#### 5. Update Person
```bash
PUT /api/person/:id
# Request body: {"name":"Jane Smith","email":"jane@example.com"}
# Response: {"message":"Updated"}
```

#### 6. Delete Person
```bash
DELETE /api/person/:id
# Response: {"message":"Deleted"}
```

### Example Requests

Using curl:
```bash
# Get all persons
curl http://localhost:3001/api/person

# Create person
curl -X POST http://localhost:3001/api/person \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Update person
curl -X PUT http://localhost:3001/api/person/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice.new@example.com"}'

# Delete person
curl -X DELETE http://localhost:3001/api/person/1
```

Using the frontend test script:
```bash
cd backend
./testApiEndpoint.sh -u localhost:3000
```

## 🔧 Configuration

### Frontend Configuration

**proxy in package.json** (for local development):
```json
"proxy": "http://localhost:3000"
```

This allows fetching from `/api` instead of hardcoding the full URL.

**API Calls in Components:**
```javascript
// Automatically proxied during development
const response = await axios.get('/api/person');

// In production, the ingress handles the routing
// No code changes needed
```

### Backend Configuration

**Environment Variables** (via ConfigMap):
```
DB_HOST=mysql-service
DB_USER=root
DB_NAME=person_db
PORT=3000
NODE_ENV=production
```

**Environment Variables** (via Secret):
```
DB_ROOT_PASSWORD=root-password-123
```

### Database Configuration

**MySQL Configuration** (in docker-compose.yml):
```yaml
MYSQL_ROOT_PASSWORD: root-password-123
MYSQL_DATABASE: person_db
```

## 🐳 Docker Setup

### Building Images

**Backend:**
```bash
cd backend
docker build -f Dockerfile.prod -t person-backend:latest .
```

**Frontend:**
```bash
cd frontend
docker build -t person-frontend:latest .
```

### Running Containers

**Backend:**
```bash
docker run -e DB_HOST=mysql-host \
  -e DB_USER=root \
  -e DB_ROOT_PASSWORD=password \
  -e DB_NAME=person_db \
  -p 3000:3000 \
  person-backend:latest
```

**Frontend:**
```bash
docker run -p 3000:3000 person-frontend:latest
```

## ☸️ Kubernetes Deployment

### Architecture

```
person.app.com
    ↓
[Nginx Ingress Controller]
    ├─ / → Frontend Service
    └─ /api → Backend Service
         ↓
      Backend Pods (2 replicas)
         ↓
      MySQL Pod (1 replica)
```

### Resource Requirements

| Component | Requests | Limits |
|-----------|----------|--------|
| Frontend | 128Mi / 100m | 256Mi / 500m |
| Backend | 128Mi / 100m | 256Mi / 500m |
| MySQL | 512Mi / 250m | 1Gi / 1000m |
| Nginx | 64Mi / 50m | 128Mi / 250m |

### Scaling

```bash
# Scale frontend
kubectl scale deployment frontend -n person-app --replicas=3

# Scale backend
kubectl scale deployment backend -n person-app --replicas=4

# View current replicas
kubectl get deployment -n person-app
```

## 🧪 Testing

### Using the Test Script

```bash
cd backend
./testApiEndpoint.sh -u localhost:3000
# Select option 7 for automated testing
```

### Using Jest/Node Test

```bash
cd backend
npm test
```

### Manual Testing with curl

```bash
# Add a person
curl -X POST http://localhost:3000/api/person \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'

# Get all persons
curl http://localhost:3000/api/person

# Update a person
curl -X PUT http://localhost:3000/api/person/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name","email":"updated@example.com"}'

# Delete a person
curl -X DELETE http://localhost:3000/api/person/1
```

## 🐛 Troubleshooting

### Docker Compose Issues

**Problem:** Containers not connecting
```bash
# Check network
docker network ls
docker network inspect e2e-fullstack-pern_person-network

# Restart services
docker-compose restart
```

**Problem:** Port conflicts
```bash
# Find process using port
lsof -i :3000

# Kill process or change port in docker-compose.yml
```

### Kubernetes Issues

**Problem:** Pods not starting
```bash
kubectl describe pod <pod-name> -n person-app
kubectl logs <pod-name> -n person-app
```

**Problem:** Ingress not resolving
```bash
# Check DNS
nslookup person.app.com

# Check /etc/hosts
cat /etc/hosts | grep person.app.com

# Restart Nginx controller
kubectl rollout restart deployment/ingress-nginx-controller -n ingress-nginx
```

**Problem:** Backend can't connect to MySQL
```bash
# Port forward MySQL for testing
kubectl port-forward svc/mysql-service 3306:3306 -n person-app

# Test connection
mysql -h 127.0.0.1 -u root -p
```

## 📊 Monitoring

### View Logs

```bash
# Frontend logs
kubectl logs -f deployment/frontend -n person-app

# Backend logs
kubectl logs -f deployment/backend -n person-app

# MySQL logs
kubectl logs -f deployment/mysql -n person-app
```

### Monitor Resource Usage

```bash
# Top nodes
kubectl top nodes

# Top pods
kubectl top pods -n person-app
```

### Port Forwarding for Local Access

```bash
# Frontend
kubectl port-forward svc/frontend-service 3000:3000 -n person-app

# Backend
kubectl port-forward svc/backend-service 3001:3000 -n person-app

# MySQL
kubectl port-forward svc/mysql-service 3306:3306 -n person-app
```

## 🔐 Security Considerations

### For Production:

1. **Change Default Secrets:**
   - Update `DB_ROOT_PASSWORD` in `02-secret-mysql.yaml`
   - Use strong passwords (min 16 characters)

2. **Enable SSL/TLS:**
   - Install cert-manager
   - Configure Let's Encrypt for automatic certificates
   - Update ingress with tls configuration

3. **Network Policies:**
   - Implement NetworkPolicies to restrict traffic
   - Only allow necessary pod-to-pod communication

4. **RBAC:**
   - Create service accounts with minimal permissions
   - Bind roles appropriately

5. **Image Registry:**
   - Push images to private registry
   - Implement image scanning

6. **Database:**
   - Use managed database service (AWS RDS, Google Cloud SQL)
   - Enable automated backups
   - Implement encryption at rest

## 📝 Environment Setup

### Local Development

1. Install Node.js 18+
2. Install Docker & Docker Compose
3. Install Docker Desktop (includes Kubernetes)
4. Update `/etc/hosts` for `person.app.com`

### Production Deployment

1. Kubernetes cluster (EKS, GKE, AKS)
2. Nginx Ingress Controller
3. cert-manager for SSL
4. Prometheus & Grafana for monitoring
5. Centralized logging (ELK/Loki)
6. CI/CD pipeline (GitHub Actions, GitLab CI)

## 🚀 Performance Tips

1. **Frontend:**
   - Enable code splitting
   - Optimize images
   - Use service worker for offline support

2. **Backend:**
   - Implement caching (Redis)
   - Database query optimization
   - Connection pooling

3. **Database:**
   - Index frequently queried columns
   - Regular maintenance and vacuum
   - Monitor slow queries

4. **Infrastructure:**
   - Use CDN for static assets
   - Enable horizontal pod autoscaling
   - Configure resource requests/limits

## 📦 Deployment Checklist

- [ ] Environment variables configured
- [ ] Secrets updated for production
- [ ] Database backups configured
- [ ] SSL/TLS certificates installed
- [ ] Monitoring and logging set up
- [ ] Health checks verified
- [ ] Resource limits set appropriately
- [ ] Network policies configured
- [ ] RBAC configured
- [ ] CI/CD pipeline ready

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Node.js Documentation](https://nodejs.org/docs)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Documentation](https://kubernetes.io/docs)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx)

## 📄 License

MIT License - Feel free to use this project as a template for your applications.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please create an issue in the repository.

---

**Last Updated:** December 23, 2025
