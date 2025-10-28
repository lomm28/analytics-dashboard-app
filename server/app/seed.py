import json
import os

from app.database import Base, SessionLocal, engine
from app.models import ProductPerformance, Sale, UserMetric
from sqlalchemy.exc import IntegrityError


def load_json_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def seed():
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Sales
        sales_count = db.query(Sale).count()
        if sales_count == 0:
            data = load_json_file(os.path.join("data", "sales-data.json"))
            for item in data:
                db.add(Sale(**item))
            db.commit()

        # Products
        prod_count = db.query(ProductPerformance).count()
        if prod_count == 0:
            data = load_json_file(os.path.join("data", "product-performance.json"))
            for item in data:
                db.add(ProductPerformance(**item))
            db.commit()

        # Users
        user_count = db.query(UserMetric).count()
        if user_count == 0:
            data = load_json_file(os.path.join("data", "user-metrics.json"))
            for item in data:
                db.add(UserMetric(**item))
            db.commit()

        print("Seeding completed")
    except IntegrityError as e:
        db.rollback()
        print("Seeding error:", e)
    finally:
        db.close()


if __name__ == "__main__":
    seed()
