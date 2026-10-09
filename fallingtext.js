
    const { Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint } = Matter;

    function initFallingText(canvasContainer) {
    const engine = Engine.create();
    const width = canvasContainer.clientWidth;
    const height = canvasContainer.clientHeight;

    const render = Render.create({
      element: canvasContainer,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#0d0e15'
      }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);

    // Chão e Paredes
    const ground = Bodies.rectangle(width / 2, height + 30, width, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, { isStatic: true });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Função de auxílio para desenhar retângulos com bordas arredondadas (pills)
    function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
      ctx.beginPath();
      ctx.roundRect(x - width / 2, y - height / 2, width, height, radius);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    }

    // Criar palavra
    function createFallingText(text, x, y) {
      const fontSize = 22;
      const paddingX = 24;
      const paddingY = 14;

      // Calcular tamanho aproximado do bloco
      const estimatedWidth = text.length * 13 + paddingX;
      const height = fontSize + paddingY;

      const isHighlight = ['Front-End', 'Sortear', 'Function', 'JavaScript', 'DOM', 'Lógica', 'Math.Random()', 'GRID', 'Flexbox', 'UI/UX', 'Design', 'API REST','CRUD', 'Node.js', 'Back-End'].includes(text);

      const body = Bodies.rectangle(x, y, estimatedWidth, height, {
        restitution: 0.5,
        friction: 0.1,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent'
        }
      });

      // Salvar dados do texto dentro do próprio objeto do corpo físico
      body.customData = {
        text: text,
        fontSize: fontSize,
        width: estimatedWidth,
        height: height,
        bgColor: isHighlight ? '#c14d23' : '#1e1f29',
        textColor: isHighlight ? '#000000' : '#ffffff'
      };

      Composite.add(engine.world, body);
    }

    // Desenhar o texto e o fundo customizado a cada frame
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      const bodies = Composite.allBodies(engine.world);

      bodies.forEach(body => {
        if (body.customData) {
          const { text, fontSize, width, height, bgColor, textColor } = body.customData;

          ctx.save();
          // Mover e rotacionar a tela para a posição exata da física
          ctx.translate(body.position.x, body.position.y);
          ctx.rotate(body.angle);

          // 1. Desenha o fundo estilo "badge/pill"
          drawRoundedRect(ctx, 0, 0, width, height, 8, bgColor);

          // 2. Desenha o texto dentro do fundo
          ctx.font = `bold ${fontSize}px "Montserrat", sans-serif`;
          ctx.fillStyle = textColor;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, 0, 0);

          ctx.restore();
        }
      });
    });

    // Lista de palavras caindo
    const defaultWords = ["JavaScript", "HTML", "CSS", "Responsividade", "Clean Code", "Function", "Sortear", "Design", "Layout", "Front-End", "Desenvolvimento Web", "API REST", "Peeds", "Landing Page"];
    const customWords = canvasContainer.dataset.words
      ?.split('|')
      .map(word => word.trim())
      .filter(Boolean);
    const words = customWords?.length ? customWords : defaultWords;

    words.forEach((word, index) => {
      setTimeout(() => {
        const margin = Math.min(80, width / 2);
        const randomX = margin + Math.random() * (width - margin * 2);
        createFallingText(word, randomX, -50);
      }, index * 200);
    });

    // Interatividade com o mouse
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    }

    document.querySelectorAll('.falling-text-container').forEach(initFallingText);