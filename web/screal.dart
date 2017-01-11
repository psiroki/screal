import "package:box2d/box2d.dart";
import "dart:html" hide Body;
import "dart:web_audio";
import "dart:typed_data";
import "dart:math" as math;

class Screal {
  Screal()
      : world = new World.withGravity(new Vector2(0.0, 10.0)),
        audio = new AudioContext() {
    _landingNoise = audio.createBuffer(1, 4410, 44100);
    Float32List samples = new Float32List(4410);
    for (int i = 0; i < samples.length; ++i) {
      samples[i] = math.sin(i / 512.0 * math.PI) *
          8 *
          math.min(1.0, i * 8 / samples.length) *
          math.min(1.0, 1 - i / samples.length);
    }
    _landingNoise.copyToChannel(samples, 0);
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
    if (pixelRatio != 1) {
      canvas.style.width = "${1280/pixelRatio}px";
      canvas.style.height = "${720/pixelRatio}px";
    }
    context = canvas.getContext("2d");
    canvas.onMouseDown.listen((_) => jumping = true);
    canvas.onMouseUp.listen((_) => jumping = false);
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
    context.fillStyle = bodyOnGround ? "#08c" : "#080";
    context.fillRect(-1, -1, 2, 2);
    context.restore();

    context.save();
    transformToLocal(ground);
    context.fillStyle = "#c80";
    context.fillRect(-16, -1, 32, 2);
    context.restore();

    context.restore();

    stepWorld();
    window.requestAnimationFrame(render);
  }

  void stepWorld() {
    ContactEdge edge = body.getContactList();
    Vector2 connectionPoints = new Vector2.zero();
    int connectionPointCount = 0;
    for (; edge != null; edge = edge.next) {
      Contact contact = edge.contact;
      WorldManifold manifold = new WorldManifold();
      contact.getWorldManifold(manifold);
      if (manifold.normal.y > -0.5) continue;
      for (Vector2 point in manifold.points) {
        connectionPoints.add(point);
        ++connectionPointCount;
      }
    }
    bool lastBodyOnGround = bodyOnGround;
    bodyOnGround = connectionPointCount > 0;
    if (jumping && bodyOnGround) {
      connectionPoints.scale(1.0 / connectionPointCount);
      Vector2 at = connectionPoints;
      Vector2 dir = new Vector2(0.0, -100.0);
      body.applyForce(dir, at);
      print("Jump");
    }
    world.stepDt(1.0 / 60.0, 10, 10);
    if (!lastBodyOnGround && bodyOnGround) {
      AudioBufferSourceNode landingNoise = audio.createBufferSource();
      landingNoise.buffer = _landingNoise;
      landingNoise.connectNode(audio.destination);
      landingNoise.start(audio.currentTime);
    }
  }

  final World world;
  final AudioContext audio;
  AudioBuffer _landingNoise;
  bool bodyOnGround = false;
  bool jumping = false;
  Body body;
  Body ground;
  CanvasElement canvas;
  CanvasRenderingContext2D context;
}

void main() {
  Screal screal = new Screal();
  screal.start();
}
