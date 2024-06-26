export async function GET() {
	const res = await fetch('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5');
	const data = await res.json();

	return Response.json({ data });
}
