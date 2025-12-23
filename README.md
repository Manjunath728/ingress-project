# E2E Fullstack PERN Application

A complete full-stack application built with **PostgreSQL/MySQL, Express, React, and Node.js (PERN)** stack, containerized with Docker and deployable to Kubernetes.

## Project Overview

This application provides a complete person management system with:
- **Backend API**: Node.js/Express server with MySQL database integration
- **Frontend**: React SPA with form management and real-time data display
- **Database**: MySQL with automatic schema initialization
- **Containerization**: Docker multi-stage builds for optimized images
- **Orchestration**: Kubernetes manifests with auto-scaling and ingress routing

The application includes CRUD operations for managing person records (name, email) with full validation and error handling.

## Prerequisites / Requirements

### For Local Development
- **Node.js** 18.x or higher
- **npm** (comes with Node.js)
- **MySQL Server** 8.0 or higher (for local development)
- **curl** (for testing API endpoints)

### For Docker/Kubernetes Deployment
- **Docker** 20.10+ (with Docker Compose if available)
- **Kubernetes** 1.24+ (kind, Docker Desktop, or cloud cluster)
- **kubectl** configured to access your cluster
- **kind** (optional, for local Kubernetes testing)

### System Requirements
- At least 4GB RAM for Kubernetes deployments
- 2GB disk space for Docker images and container data

## Installation / Setup

### 1. Local Development Setup

#### Clone the Repository
```bash
git clone <repository-url>
cd e2e-fullstack-pern
```

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with database configuration
cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_ROOT_PASSWORD=my-secret-pw
DB_NAME=mydb
PORT=3001
EOF

# Start MySQL locally
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -e MYSQL_DATABASE=mydb \
  -p 3306:3306 \
  -d mysql:latest

# Start the backend server (development mode with auto-reload)
npm run dev
# or production mode
npm start
```

The backend API will be available at `http://localhost:3001`.

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will be available at `http://localhost:3000` and automatically proxies API calls to `http://localhost:3001`.

### 2. Docker Setup (Local)

Build and run containers locally without installing MySQL separately.

#### Build Docker Images
```bash
# Build backend image
cd backend
docker build -t person-backend:latest .

# Build frontend image
cd frontend
docker build -t person-frontend:latest .
```

#### Run with Docker Compose (or Docker commands)
```bash
# Run MySQL container
docker run --name mysql \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -e MYSQL_DATABASE=mydb \
  -p 3306:3306 \
  -d mysql:latest

# Run backend container
docker run \
  -e DB_HOST=host.docker.internal \
  -e DB_USER=root \
  -e DB_ROOT_PASSWORD=my-secret-pw \
  -e DB_NAME=mydb \
  -p 3001:3000 \
  person-backend:latest

# Run frontend container
docker run \
  -p 3000:3000 \
  person-frontend:latest
```

Access the application at `http://localhost:3000`.

### 3. Kubernetes Setup

#### Create Kind Cluster (optional, for local testing)
```bash
kind create cluster --config=manifest/kind-cluster.yaml --name=person-app
```

#### Deploy to Kubernetes

1. **Create namespace and database**
```bash
kubectl apply -f manifest/00-namespace.yaml
kubectl apply -f manifest/01-db.yaml
```

2. **Build and load images into Kind (if using Kind)**
```bash
cd backend
docker build -t person-backend:latest .
kind load docker-image person-backend:latest --name=person-app

cd ../frontend
docker build -t person-frontend:latest .
kind load docker-image person-frontend:latest --name=person-app
```

3. **Deploy backend and frontend**
```bash
kubectl apply -f manifest/02-backend.yaml
kubectl apply -f manifest/03-frontend.yaml
```

4. **Deploy ingress controller and routes**
```bash
kubectl apply -f manifest/05-ingress-deploy.yaml
kubectl apply -f manifest/04-ingress.yaml
```

5. **Verify deployments**
```bash
kubectl get deployments -n person-app
kubectl get pods -n person-app
kubectl get svc -n person-app
```

6. **Access the application**

For kind clusters, add to `/etc/hosts`:
```
127.0.0.1 person.local.com
```

Then visit `http://person.local.com`.

## Running the Application

### Development Mode

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm start
```

### Production Build

**Backend**
```bash
cd backend
npm start
```

**Frontend**
```bash
cd frontend
npm run build  # Creates optimized build
npm install -g serve
serve -s build -l 3000
```

### Testing

**Run backend tests with coverage**
```bash
cd backend
npm test
```

This runs all test cases defined in `test.js` including:
- Health check endpoint
- CRUD operations (Create, Read, Update, Delete)
- Data persistence

## Important Commands / Tips

### Backend Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start backend server in production mode |
| `npm run dev` | Start with nodemon (auto-reload on changes) |
| `npm test` | Run test suite with code coverage |
| `npx c8 node --test test.js` | Generate code coverage report |

### Frontend Commands

| Command | Purpose |
|---------|---------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm test` | Run React tests |

### Docker Commands

```bash
# Build images
docker build -t person-backend:latest backend/
docker build -t person-frontend:latest frontend/

# List images
docker images | grep person

# Remove containers/images
docker rm <container-id>
docker rmi <image-id>
```

### Kubernetes Commands

```bash
# View resources
kubectl get all -n person-app
kubectl get pods -n person-app -w                    # Watch pods
kubectl logs <pod-name> -n person-app               # View logs
kubectl describe pod <pod-name> -n person-app       # Detailed pod info

# Port forwarding
kubectl port-forward svc/backend-service 3001:3000 -n person-app
kubectl port-forward svc/frontend-service 3000:3000 -n person-app

# Scale deployments
kubectl scale deployment backend --replicas=3 -n person-app
kubectl scale deployment frontend --replicas=3 -n person-app

# Delete resources
kubectl delete -f manifest/
kubectl delete namespace person-app
```

### Load Testing (Kubernetes)

```bash
# Run load test pod to simulate traffic
kubectl run -it --rm load \
  --image=busybox \
  -n person-app \
  -- sh

# Inside the pod:
while true; do wget -q -O- http://backend-service:3000/; done
```

## Configuration / Environment Variables

### Backend Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `localhost` | MySQL server hostname |
| `DB_USER` | `root` | MySQL username |
| `DB_ROOT_PASSWORD` | `my-secret-pw` | MySQL root password |
| `DB_NAME` | `mydb` | Database name (auto-created) |
| `PORT` | `3001` | Backend server port |
| `NODE_ENV` | `development` | Node environment (development/production) |

**Local Development (.env file)**
```properties
DB_HOST=localhost
DB_USER=root
DB_ROOT_PASSWORD=my-secret-pw
DB_NAME=mydb
PORT=3001
```

**Docker Environment**
Use `-e` flag with `docker run`:
```bash
docker run -e DB_HOST=host.docker.internal \
  -e DB_USER=root \
  -e DB_ROOT_PASSWORD=my-secret-pw \
  -e DB_NAME=mydb \
  person-backend:latest
```

**Kubernetes Configuration**
Defined in `manifest/02-backend.yaml`:
- ConfigMap stores non-sensitive values (DB_HOST, DB_USER, DB_NAME, etc.)
- Secrets store sensitive values (DB_ROOT_PASSWORD)

### Frontend Configuration

The frontend is configured via environment variables at build time:

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001` | Backend API URL |

In Docker production images, the proxy is handled by the ingress controller.

### MySQL Configuration (Kubernetes)

Credentials defined in `manifest/01-db.yaml`:
```yaml
MYSQL_ROOT_PASSWORD: "root"          # Base64: cm9vdA==
MYSQL_PASSWORD: "password123"        # Base64: cGFzc3dvcmQxMjM=
MYSQL_DATABASE: "person_db"
MYSQL_USER: "person_user"
```

Database persists via PersistentVolumeClaim (10Gi storage).

## API Endpoints

### Health Check
```bash
GET /
# Response: {"message": "API is working"}
```

### Get All Persons
```bash
GET /api/person
# Response: [{"id": 1, "name": "John Doe", "email": "john@example.com"}, ...]
```

### Get Single Person
```bash
GET /api/person/:id
# Response: {"id": 1, "name": "John Doe", "email": "john@example.com"}
```

### Create Person
```bash
POST /api/person
# Body: {"name": "John Doe", "email": "john@example.com"}
# Response: {"id": 1}
```

### Update Person
```bash
PUT /api/person/:id
# Body: {"name": "Jane Doe", "email": "jane@example.com"}
# Response: {"message": "Updated"}
```

### Delete Person
```bash
DELETE /api/person/:id
# Response: {"message": "Deleted"}
```

## Testing API Endpoints

Use the provided test script:
```bash
cd backend
bash testApiEndpoint.sh -u http://localhost:3001 --auto
```

Or use curl directly:
```bash
# Health check
curl http://localhost:3001/

# Create person
curl -X POST http://localhost:3001/api/person \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'

# List all
curl http://localhost:3001/api/person

# Get by ID
curl http://localhost:3001/api/person/1

# Update
curl -X PUT http://localhost:3001/api/person/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'

# Delete
curl -X DELETE http://localhost:3001/api/person/1
```

## Database Schema

The application automatically creates the following table:

```sql
CREATE TABLE IF NOT EXISTS persons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
)
```

## Troubleshooting

### Backend won't connect to MySQL
- Ensure MySQL is running: `docker ps` (if using Docker)
- Check `.env` variables match your MySQL credentials
- For Docker containers, use `host.docker.internal` instead of `localhost` for DB_HOST
- For Kubernetes, use `mysql-service` as DB_HOST

### Frontend shows API errors
- Verify backend is running and accessible at the configured API URL
- Check CORS is enabled in backend (it is by default)
- In development, check the proxy setting in `frontend/package.json`

### Kubernetes pods not starting
- Check pod logs: `kubectl logs <pod-name> -n person-app`
- Verify images are loaded: `docker images | grep person` (for kind)
- Ensure namespace exists: `kubectl get namespace person-app`
- Check resource limits aren't exceeded: `kubectl describe node`

### Port already in use
```bash
# Find process using the port
lsof -i :3001    # macOS/Linux
netstat -ano | findstr :3001  # Windows

# Kill the process or use a different port
```

## Project Structure

```
e2e-fullstack-pern/
├── backend/                    # Node.js/Express API
│   ├── index.js               # Main server file with routes
│   ├── test.js                # Test suite
│   ├── testApiEndpoint.sh     # API testing script
│   ├── dockerfile             # Multi-stage Docker build
│   ├── package.json           # Dependencies and scripts
│   └── .env                   # Environment configuration
├── frontend/                   # React application
│   ├── src/
│   │   ├── App.js             # Main React component
│   │   ├── components/        # Reusable components
│   │   └── index.js           # React entry point
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── Dockerfile             # Frontend Docker build
│   └── package.json           # React dependencies
├── manifest/                   # Kubernetes manifests
│   ├── 00-namespace.yaml      # Create namespace
│   ├── 01-db.yaml             # MySQL deployment
│   ├── 02-backend.yaml        # Backend deployment
│   ├── 03-frontend.yaml       # Frontend deployment
│   ├── 04-ingress.yaml        # Ingress routing
│   ├── 05-ingress-deploy.yaml # Ingress controller
│   └── kind-cluster.yaml      # Kind cluster config
└── README.md                   # This file
```

## Additional Resources

- [Kind Cluster Setup Guide](https://betterstack.com/community/guides/scaling-docker/kind/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
