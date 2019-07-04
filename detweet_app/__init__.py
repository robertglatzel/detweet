from flask import Flask
from .models import db, login_manager
from .oauth import blueprint
from .cli import create_db

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
app.register_blueprint(blueprint, url_prefix="/login")
app.cli.add_command(create_db)
db.init_app(app)
login_manager.init_app(app)

from . import routes
