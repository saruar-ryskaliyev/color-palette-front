from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from database import Base  # Ensure Base is imported from your model definitions

# Setup your database URL
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def clear_database():
    session = Session()
    try:
        # For SQLite
        session.execute(text("PRAGMA foreign_keys = OFF;"))

        # For PostgreSQL or MySQL
        # session.execute("SET FOREIGN_KEY_CHECKS = 0;")  # Uncomment this line for MySQL
        # session.execute("SET session_replication_role = 'replica';")  # Uncomment this line for PostgreSQL

        for table in reversed(Base.metadata.sorted_tables):
            session.execute(table.delete())
        session.commit()

        # Re-enable foreign key constraints
        session.execute(text("PRAGMA foreign_keys = ON;")) # For SQLite
        # session.execute("SET FOREIGN_KEY_CHECKS = 1;")  # Uncomment this line for MySQL
        # session.execute("SET session_replication_role = 'origin';")  # Uncomment this line for PostgreSQL
    except Exception as e:
        session.rollback()
        print(f"Error occurred: {e}")
    finally:
        session.close()

clear_database()
