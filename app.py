"""Flask app for Cupcakes"""
import os

from flask import Flask, jsonify, request

from models import connect_db, db, Cupcake


app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", "postgresql:///cupcakes")

connect_db(app)

@app.get('/api/cupcakes')
def get_all_cupcakes():
    """Return JSON {'cupcakes': [{id, flavor, size, rating, image_url},
    {id, flavor, size, rating, image_url},...]}"""##TODO:say what it does as well

    cupcakes = Cupcake.query.all()
    serialized = [cupcake.serialize() for cupcake in cupcakes]

    return jsonify(cupcakes=serialized)

@app.get('/api/cupcakes/<int:cupcake_id>')
def get_single_cupcake(cupcake_id):
    """Return JSON {'cupcake': {id, flavor, size, rating, image_url}}"""##TODO:say what it does as well

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.post('/api/cupcakes')
def create_cupcake():
    """Create cupcake from posted JSON data & return it.
    Returns JSON {'cupcake':{id, flavor, size, rating, image_url}}
    """

    cupcake =Cupcake(
        flavor=request.json['flavor'],
        size=request.json['size'],
        rating=request.json['rating'],
        image_url=request.json['image_url'] or None)

    db.session.add(cupcake)
    db.session.commit()

    serialized = cupcake.serialize()

    return (jsonify(cupcake=serialized), 201)

