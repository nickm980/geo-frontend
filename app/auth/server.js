import express from "express";
import cookieSession from "cookie-session";

const app = express();
var events = [];

const placeholderEvent = {
    "isCustom": true,
    "companyName": "Company Name",
    "title": "Volunteering Example",
    "phone": "555-555-5555",
    "description": "Description of the event",
    "location": "location of the event"
};

app.use(express.cookieParser());

app.use("/", (req, res, next) => {
    next()
});

app.get("/health", (req, res) => {
    console.log("[Req] healthy");
    res.json({
        "status": "healthy"
    });
});

app.post("/event", (req, res) => {
    events.push({
        "isCustom": true,
        "companyName": req.body.companyName,
        "title": req.body.title,
        "phone": req.body.phone,
        "description": req.body.desc,
        "description": req.body.type,
        "location": req.body.location,
        "category": req.query.category
    }
    );
    res.json({
        "status": "OK"
    });
});

app.get("/events/:category", (req, res) => {
    if (events.length == 0) {
        events.push(
            placeholderEvent
        )
    }
    res.json({
        "status": "OK",
        "events": events.filter(e => {e.category == req.params.category})
    })
});


app.listen(3000)