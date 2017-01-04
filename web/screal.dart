import "package:box2d/box2d.dart";
import "dart:html" hide Body;

class Screal {
  Screal():
    world = new World.withGravity(new Vector2(0.0, 10.0)) {
    BodyDef bd = new BodyDef();
    PolygonShape poly = new PolygonShape();
    poly.setAsBoxXY(16.0, 1.0);
    bd.setPosition(new Vector2(0.0, 4.0));
    ground = world.createBody(bd);
    ground.createFixtureFromShape(poly);

    bd.setPosition(new Vector2(0.0, -4.0));
    bd.setAngle(1.0);
    bd.type = BodyType.DYNAMIC;
    body = world.createBody(bd);
    poly = new PolygonShape();
    poly.setAsBoxXY(1.0, 1.0);
    final FixtureDef activeFixtureDef = new FixtureDef();
    activeFixtureDef.restitution = 0.5;
    activeFixtureDef.density = 0.05;
    activeFixtureDef.shape = poly;
    body.createFixtureFromFixtureDef(activeFixtureDef);
    canvas = new CanvasElement(width: 1280, height: 720);
    num pixelRatio = window.devicePixelRatio;
    if(pixelRatio != 1) {
      canvas.style.width = "${1280/pixelRatio}px";
      canvas.style.height = "${720/pixelRatio}px";
    }
    context = canvas.getContext("2d");
  }

  void start() {
    document.body.append(canvas);
    window.requestAnimationFrame(render);
  }

  void transformToLocal(Body body) {
    Vector2 center = body.worldCenter;
    double angle = body.getAngle();
    context.translate(center.x, center.y);
    context.rotate(angle);
  }

  void render(num timestamp) {
    context.clearRect(0, 0, 1280, 720);
    context.save();
    context.translate(640, 360);
    context.scale(32, 32);

    context.save();
    transformToLocal(body);
    context.fillStyle = "#08c";
    context.fillRect(-1, -1, 2, 2);
    context.restore();

    context.save();
    transformToLocal(ground);
    context.fillStyle = "#c80";
    context.fillRect(-16, -1, 32, 2);
    context.restore();

    context.restore();
    
    world.stepDt(1.0/60.0, 10, 10);
    window.requestAnimationFrame(render);
  }

  final World world;
  Body body;
  Body ground;
  CanvasElement canvas;
  CanvasRenderingContext2D context;
}

void main() {
  Screal screal = new Screal();
  screal.start();
}
