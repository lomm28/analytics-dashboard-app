import os

from app.database import Base, engine, get_db
from app.models import ProductPerformance, Sale, UserMetric
from app.schemas import ProductPerformance as ProductPerformanceSchema
from app.schemas import Sale as SaleSchema
from app.schemas import UserMetric as UserMetricSchema
from dotenv import load_dotenv
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Analytics API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_ORIGIN")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/sales", response_model=list[SaleSchema])
def get_sales(db: Session = Depends(get_db)):
    items = db.query(Sale).order_by(Sale.id).all()
    return items


@app.get("/api/products", response_model=list[ProductPerformanceSchema])
def get_products(db: Session = Depends(get_db)):
    items = db.query(ProductPerformance).order_by(ProductPerformance.id).all()
    return items


@app.get("/api/users", response_model=list[UserMetricSchema])
def get_users(db: Session = Depends(get_db)):
    items = db.query(UserMetric).order_by(UserMetric.id).all()
    return items


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, debug=True)
