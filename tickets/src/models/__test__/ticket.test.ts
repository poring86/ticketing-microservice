import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 5,
        userId: "123",
    });

    // Save ticket to database
    await ticket.save();

    // Fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // Make two separete changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    // Save the first
    await firstInstance!.save();

    // Save the second and expect an error

    // expect(async () => {
    //     await secondInstance!.save()
    // }).toThrow()

    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    }

    throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
    const ticket = Ticket.build({
        title: "concert",
        price: 20,
        userId: "123",
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});
