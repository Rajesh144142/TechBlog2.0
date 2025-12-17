# AiBlog Server

FastAPI server for AiBlog application.

## Setup

### 1. Create Virtual Environment

```bash
cd server
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

> The `-r` flag tells pip to read and install all packages listed in the requirements file.

### 4. Environment Variables

Create a `.env` file in the server folder:

```bash
cp env.example .env
```

Edit `.env` with your configuration.

### 5. Run Server

```bash
uvicorn app:app --reload --port 5000
```

Server runs at `http://localhost:5000`

API docs available at `http://localhost:5000/docs`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## Adding New Routes

Add routes in `app.py`:

```python
@app.get("/api/your-route")
def your_function():
    return {"data": "value"}
```
