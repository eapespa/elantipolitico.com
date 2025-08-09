const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (request.method === "POST") {
      try {
        const data = await request.json();
        const db = env.DB;

        const result = await db
  .prepare(
    `INSERT INTO registros (tipo, nombre, apellido1, apellido2, email, dni, provincia, monto, estado)
     VALUES ('donacion', ?, ?, ?, ?, ?, ?, ?, 'pendiente')`
  )
  .bind(
    data.nombre,
    data.apellido1,
    data.apellido2,
    data.email,
    data.dni,
    data.provincia,
    data.monto
  )
  .run();

        return new Response(
          JSON.stringify({ success: true, id: result.lastInsertRowId }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      } catch (e) {
        return new Response(
          JSON.stringify({ error: e.message }),
          {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
    }

    return new Response("Method not allowed", { status: 405 });
  },
};
