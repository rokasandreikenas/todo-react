import express, { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

const taskValidation = checkSchema({
    title: {
        isString: true,
        isLength: {
            options: {min: 5},
        }
    },
    description: {
        isString: true,
        isLength: {
            options: {min: 5},
        }
    },
    done: {
        isBoolean: true,
        default: {
            options: false
        },
    }
})

const tasks: {[key: string]: Record<string, unknown>} = {}
tasks[uuidv4()] = {title: "Complete Refactoring", done: false};


function taskList() {
    return Object.entries(tasks).map(([id, task]) => ({id, ...task}));
}

function taskFromReq(req: Request) {
    return {
        title: req.body.title,
        description: req.body.description,
        done: req.body.done
    };
}

function errorResponse(errors: any, res: any) {
    return res.status(400).json({ errors: errors.array() });
}

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.get("/", (req, res) => {
    res.send(taskList());
});

app.post("/", taskValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(errors, res);
    }
    const task = taskFromReq(req);

    tasks[uuidv4()] = task
    res.send(taskList());
});

app.put("/:id", taskValidation, (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(errors, res);
    }

    const taskId= req.params.id
    if (tasks[taskId]) {
        tasks[taskId] = taskFromReq(req);
    }
    res.send(taskList());
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${ port }`);
});
