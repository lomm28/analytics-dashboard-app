from typing import Optional

from pydantic import BaseModel


class Sale(BaseModel):
    id: Optional[int]
    month: str
    revenue: int
    expenses: int
    profit: int
    customers: int

    class Config:
        from_attributes = True


class ProductPerformance(BaseModel):
    id: Optional[int]
    product: str
    sales: int
    growth: float

    class Config:
        from_attributes = True


class UserMetric(BaseModel):
    id: Optional[int]
    region: str
    activeUsers: int
    newUsers: int
    churnRate: float
    avgSessionTime: float

    class Config:
        from_attributes = True
