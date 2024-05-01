// module aliases
let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    Events = Matter.Events,

    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
let engine = Engine.create();

// create a renderer
let render = Render.create({
    element: document.getElementById('divMatter'),
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false, // If you don't want wireframes
        background: "stage_background.png", // Optional: if you want a transparent background
        fillStyle: '#ffffff' // Set the fill color for all bodies
    }

});

// add images
let optionsArmB = {
    render: {
        sprite: {
            texture: "clown_puppet.png"
        }
    }
}

let optionsPuppetA = {
    kind: "puppetA",
    render: {
        sprite: {
            texture: "clown_puppetA.png"
        }
    }
}

let optionsPuppetB = {
    kind: "puppetB",
    render: {
        sprite: {
            texture: "clown_puppetB.png"
        }
    }
}

//add textA options
let optionsTextA1 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textA1.png",
            xScale: 0.35,
            yScale: 0.35
        },
        
    }

}

let optionsTextA2 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textA2.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }

}

let optionsTextA3 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textA3.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }

}

let optionsTextA4 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textA4.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }

}

let optionsTextA5 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textA5.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }

}

let optionsTextA6 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textA6.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }

}

//add textB options
let optionsTextB1 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textB1.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }
}

let optionsTextB2 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textB2.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }
}

let optionsTextB3 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textB3.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }
}

let optionsTextB4 = {
    isStatic: true,
    render: { 

        sprite: {
            texture: "textB4.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }
}

let optionsTextB5 = {
    isStatic: true,
    render: {
        sprite: {
            texture: "textB5.png",
            xScale: 0.35,
            yScale: 0.35
        }
    }
}

// create two boxes and a ground
let topA = Bodies.circle(200, 300, 5, {isStatic: true});
let topB = Bodies.circle(600, 350, 5, {isStatic: true});
let bottomA = Bodies.circle(200, 550, 5, {isStatic: true});
let bottomB = Bodies.circle(600, 550, 5, {isStatic: true});
let puppetA = Bodies.rectangle(400, 550, 150, 250, optionsPuppetA);
let puppetB = Bodies.rectangle(400, 550, 150, 250, optionsPuppetB);
let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [ topA, topB, bottomA, bottomB, puppetA, puppetB, ground]);
 
//puppetA top constraint
let constraint = Constraint.create ({
    bodyA: topA,
    pointA: {x: 0, y:0},
    bodyB: puppetA,
    pointB: {x: -30, y: -100},
    length: 85,
    damping: 0.5,
    stiffness: 0.01,
    render:{visible: false}
});

//puppetB top constraint
let constraint2 = Constraint.create ({
    bodyA: topB,
    pointA: {x: 0, y: 0},
    bodyB: puppetB,
    pointB: {x: 20, y: -200},
    length: 85,
    damping: 0.5,
    stiffness: 0.01,
    render:{visible: false}
});

//puppetA bottom constraint 
let constraint3 = Constraint.create ({
    bodyA: bottomA,
    pointA: {x: 0, y:0},
    bodyB: puppetA,
    pointB: {x: -40, y: 100},
    length: 25,
    damping: 0.5,
    stiffness: 0.5,
    render:{visible: false}
});

//puppetB bottom constraint
let constraint4 = Constraint.create ({
    bodyA: bottomB,
    pointA: {x: 0, y: 0},
    bodyB: puppetB,
    pointB: {x: 80, y: 100},
    length: 20,
    damping: 0.5,
    stiffness: 0.5,
    render:{visible: false}
});


// add all of the bodies to the world
Composite.add(engine.world, [constraint]);
Composite.add(engine.world, [constraint2]);
Composite.add(engine.world, [constraint3]);
Composite.add(engine.world, [constraint4]);

// run the renderer
Render.run(render);

// create runner
let runner = Runner.create();

// run the engine
Runner.run(runner, engine);

// add mouse control and make the mouse revolute
let mouse = Mouse.create(render.canvas);

let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.6,
        length: 0,
        angularStiffness: 0,
        render: {
            visible: true
        }
    }
});

Composite.add(engine.world, [mouseConstraint]);

//add a rectangle to the world when puppet A is clicked using repetitive structure for each additional textbox

for (let i = 1; i < 7; i++) {
    Events.on(mouseConstraint, 'mousedown', function(event) {
        let mousePosition = event.mouse.position;
        if (mousePosition.x >= 100 && mousePosition.x <= 300 && mousePosition.y >= 150 && mousePosition.y <= 600) {
            let textBubbleA = Bodies.rectangle(200, 100, 100, 200, optionsTextA[i]);
            Composite.add(engine.world, [textBubbleA]);
        }
    });
}

Events.on(mouseConstraint, 'mousedown', function(event) {
    let mousePosition = event.mouse.position;
    if (mousePosition.x >= 100 && mousePosition.x <= 300 && mousePosition.y >= 150 && mousePosition.y <= 600) {
        let textBubbleA = Bodies.rectangle(200, 100, 100, 200, optionsTextA1);
        Composite.add(engine.world, [textBubbleA]);
    }
});

//add a rectangle to the world when puppet B is clicked with the mouse

Events.on(mouseConstraint, 'mousedown', function(event) {
    let mousePosition = event.mouse.position;
    if (mousePosition.x >= 500 && mousePosition.x <= 700 && mousePosition.y >= 150 && mousePosition.y <= 600) {
        let textBubbleB = Bodies.rectangle(550, 100, 100, 200, optionsTextB1);
        Composite.add(engine.world, [textBubbleB]);
    }
});

