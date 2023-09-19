import Link from "next/link"

// Here we have a dynamic rendering - every fetch rerenders all page (due to revalidate equal to 0)
async function getTickets() {
    await new Promise(resolve => setTimeout(resolve, 3000)); // imitates loading

    const res: Response = await fetch('http://localhost:4000/tickets', {
        next: {
            revalidate: 0 // 0 used to opt out of using cache
        }
    })

    return res.json();
}

export default async function TicketList() {
    const tickets = await getTickets();

    return (
        <>
            {tickets.map((ticket: {
                id: string,
                title: string,
                body: string,
                priority: string,
                user_email: string
            }) => (
                <div key={ticket.id} className="card my-5">
                    <Link href={`/tickets/${ticket.id}`}>
                        <h3>{ticket.title}</h3>
                        <p>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                        {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no open tickets, yay!</p>
            )}
        </>
    )
}