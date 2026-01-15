import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

interface INote {
  id: number;
  title: string;
  content: string;
  category: string;
}

const notes: INote[] = [];

app.get("/notes", async (request, reply) => {
  return notes;
});

app.post("/notes", async (request, reply) => {
  const body = request.body as {
    title: string;
    content: string;
    category: string;
  };

  if (!body.title || !body.content || !body.category) {
    return reply.status(400).send({
      error: "Fill title, content and category!",
    });
  }

  const newNote: INote = {
    id: notes.length + 1,
    title: body.title,
    content: body.content,
    category: body.category,
  };

  notes.push(newNote);
  return newNote;
});

try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
