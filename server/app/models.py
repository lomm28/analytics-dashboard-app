from app.database import Base
from sqlalchemy import Column, Float, Integer, String


class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String, index=True)
    revenue = Column(Integer)
    expenses = Column(Integer)
    profit = Column(Integer)
    customers = Column(Integer)


class ProductPerformance(Base):
    __tablename__ = "product_performance"

    id = Column(Integer, primary_key=True, index=True)
    product = Column(String, index=True)
    sales = Column(Integer)
    growth = Column(Float)


class UserMetric(Base):
    __tablename__ = "user_metrics"

    id = Column(Integer, primary_key=True, index=True)
    region = Column(String, index=True)
    activeUsers = Column(Integer)
    newUsers = Column(Integer)
    churnRate = Column(Float)
    avgSessionTime = Column(Float)
