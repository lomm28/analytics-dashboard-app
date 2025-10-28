"""app package for the analytics backend

This file makes `app` an explicit package which helps imports work
when running inside containers and in different execution contexts.
"""

__all__ = [
    "database",
    "models",
    "schemas",
]
