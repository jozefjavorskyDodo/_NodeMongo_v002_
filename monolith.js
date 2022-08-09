

"use strict";


try {
    var pseudo_random_ISBN_generator = () => {
        let memo_str = '';
        for (let iterator = 0; iterator <= 12; iterator++) {
            memo_str += String(Math.floor(Math.random() * 10));
            if (
                (iterator === 2) ||
                (iterator === 3) ||
                (iterator === 6) ||
                (iterator === 11)
            ) memo_str += '-';
        };
        return (
            String(memo_str)
        );
    };
} catch (err) {
    if (err) console.log(err);
};


try {
    var if_initialized = Boolean(false);
} catch (err) {
    if (err) console.log(err);
};


try {
    require("http").createServer((req, res) => {
        if (
            (require("url").parse(req.url, true).query.initialized === "true")
            &&
            (if_initialized === Boolean(false))
        ) {
            require("mongodb").MongoClient.connect("mongodb://localhost:27017", (err, db) => {
                if (err) throw err;
                db.db("tryout_db").createCollection("books_collection", (err, rslt) => {
                    if (err) throw err;
                    db.close();
                });
                db.db("tryout_db").collection("books_collection").insertMany([
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "A Walk By Sand Trees", author: "Bukekele Mengva"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Moonlight Wall", author: "Frederick Oline"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Before Big Bangs", author: "Jeffrey Khajyti"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "After Vacuum", author: "Alan Von Wolfram"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Misinterpretation And The Bug", author: "Andrew Owens"
                    },
                    {
                        ISBN: `${pseudo_random_ISBN_generator.call()}`,
                        title: "Boogie & Skating Woogie", author: "Osvald Carti"
                    }
                ], (err, rslt) => {
                    if (err) throw err;
                    db.close();
                });
            });
            if_initialized = Boolean(true);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(
                `
                ${CRUD_dot_HTML}
                `
            );
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(
                `
                ${initialize_dot_HTML}
                `
            );
            res.end();
        };
    }).listen(5500);
} catch (err) {
    if (err) console.log(err);
};


try {
    var CRUD_dot_HTML =
        `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Node.js & MongoDB Tryouts." />
            <meta name="author" content="dodo --> jozef.javorsky.strom44zem88@gmail.com" />
            <title>eLibrary v0.02</title>
            <link rel="icon" type="image/x-icon" sizes="16x16" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABSSURBVDhPY2w1b/3PQAEAG/B14lcolzTAnc/NwAJlgznoAGYwPjkmMEkBGHgDKA5E6nkBZBq20EYH6OqGUywQ439kANNDPReQA0AuoDA7MzAAADwTJLHlIc6iAAAAAElFTkSuQmCC" />
            <style>
                #html-body {
                    background-color: rgb(128, 128, 128);
                }
                .hrElement {
                    width: 12cm;
                    height: 1mm;
                    background-color: rgb(0, 0, 0);
                    margin-left: 0;
                }
                #header-h2 {
                    text-decoration: overline underline;
                    color: rgba(0, 0, 0, 1);
                    font-family: cursive;
                    margin-left: 2cm;
                }
                #main-nav {
                    margin-left: 3cm;
                    display: inline-block;
                    background-color: rgb(0, 0, 0);
                    padding: 3mm 2mm 3mm 2mm;
                    border: 0;
                    border-radius: 3mm;
                }
                .bttnCRUD {
                    margin-left: 2mm;
                    border: 0;
                    border-radius: 3mm;
                    padding: 1mm 2mm 1mm 2mm;
                    font-family: cursive;
                    font-size: 4mm;
                    color: rgba(99, 198, 99, 1);
                    background-color: rgb(88, 88, 88);
                    font-weight: 900;
                }
            </style>
        </head>
        <body id="html-body">
                <hr class="hrElement" />
                    <header>
                        <h2 id="header-h2">/ eLibrary v0.02 /</h2>
                    </header>
                <hr class="hrElement" />
                    <main>
                        <nav id="main-nav">
                            <button class="bttnCRUD" id="c-reate-bttn">add</button>
                            <button class="bttnCRUD" id="r-ead-bttn">details</button>
                            <button class="bttnCRUD" id="u-pdate-bttn">edit</button>
                            <button class="bttnCRUD" id="d-elete-bttn">remove</button>
                        </nav>
                    </main>
                <hr class="hrElement" />
                <script>
                    "use strict";
                    try {
                        let node_CRUD_bttns = document.querySelectorAll(".bttnCRUD");
                        node_CRUD_bttns.forEach(b => {
                            b.addEventListener("mouseenter", (ev) => {
                                ev.target.style.cursor = "pointer";
                                ev.target.parentElement.style.backgroundColor = "rgba(99, 198, 99, 1)";
                                ev.target.style.color = "rgba(0, 0, 0, 1)";
                            });
                            b.addEventListener("mouseleave", (ev) => {
                                ev.target.parentElement.style.backgroundColor = "rgb(0, 0, 0)";
                                ev.target.style.color = "rgba(99, 198, 99, 1)";
                            });
                        });
                    } catch (err) {
                        if (err) console.log(err);
                    };
                    try {
                        document.querySelector("#c-reate-bttn").addEventListener("click", () => {
                            window.location = "?operation=create";
                        });
                        document.querySelector("#r-ead-bttn").addEventListener("click", () => {
                            window.location = "?operation=read";
                        });
                        document.querySelector("#u-pdate-bttn").addEventListener("click", () => {
                            window.location = "?operation=update";
                        });
                        document.querySelector("#d-elete-bttn").addEventListener("click", () => {
                            window.location = "?operation=delete";
                        });
                    } catch (err) {
                        if (err) console.log(err);
                    };
                </script>
        </body>
    </html>
    `;
} catch (err) {
    if (err) console.log(err);
};


try {
    var initialize_dot_HTML =
        `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Node.js & MongoDB Tryouts." />
            <meta name="author" content="dodo --> jozef.javorsky.strom44zem88@gmail.com" />
            <title>eLibrary v0.02</title>
            <link rel="icon" type="image/x-icon" sizes="16x16" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABSSURBVDhPY2w1b/3PQAEAG/B14lcolzTAnc/NwAJlgznoAGYwPjkmMEkBGHgDKA5E6nkBZBq20EYH6OqGUywQ439kANNDPReQA0AuoDA7MzAAADwTJLHlIc6iAAAAAElFTkSuQmCC" />
            <style>
                #html-body {
                    background-color: rgb(128, 128, 128);
                }
                .hrElement {
                    width: 12cm;
                    height: 1mm;
                    background-color: rgb(0, 0, 0);
                    margin-left: 0;
                }
                #header-h2 {
                    text-decoration: overline underline;
                    color: rgba(0, 0, 0, 1);
                    font-family: cursive;
                    margin-left: 2cm;
                }
                #main-bttn {
                    margin-left: 3cm;
                    border: 0;
                    font-family: cursive;
                    border-radius: 5mm;
                    color: rgba(99, 198, 99, 1);
                    background-color: rgb(0, 0, 0);
                    padding: 1mm 2mm 1mm 2mm;
                    font-weight: 800;
                    font-size: 4mm;
                }
            </style>
        </head>
        <body id="html-body">
                <hr class="hrElement" />
                    <header>
                        <h2 id="header-h2">/ eLibrary v0.02 /</h2>
                    </header>
                <hr class="hrElement" />
                    <main>
                        <button id="main-bttn">firstly : initialize books database</button>
                    </main>
                <hr class="hrElement" />
                <script>
                    "use strict";
                    try {
                        document.querySelector("#main-bttn").addEventListener("mouseenter", (ev) => {
                            ev.target.style.cursor = "pointer";
                            ev.target.style.color = "rgba(0, 0, 0, 1)";
                            ev.target.style.backgroundColor = "rgb(99, 198, 99)";
                        });
                        document.querySelector("#main-bttn").addEventListener("mouseleave", (ev) => {
                            ev.target.style.color = "rgba(99, 198, 99, 1)";
                            ev.target.style.backgroundColor = "rgb(0, 0, 0)";
                        });
                    } catch (err) {
                        if (err) console.log(err);
                    }; 
                    try {
                        document.querySelector("#main-bttn").addEventListener("click", () => {
                            window.location = "?initialized=true";
                        });
                    } catch (err) {
                        if (err) console.log(err);
                    }; 
                </script>
        </body>
    </html>
    `;
} catch (err) {
    if (err) console.log(err);
};

