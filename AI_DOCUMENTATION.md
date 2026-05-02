**1. What did you ask the AI to help you with, and why did you choose to use AI for that specific task?**

At one point I was stuck on getting the events list to return the correct data. The frontend expected each event to include the creator’s username and the number of RSVPs, but my query was only returning the raw event data. I knew I needed to use joins and some kind of counting, but I kept getting either duplicate rows or incorrect counts.

So I asked something like:

"I'm trying to return events along with the username of the creator and the number of RSVPs for each event in PostgreSQL. How do I write a query that joins these tables and counts correctly without duplicating rows?"

I chose to use AI here because this felt like one of those situations where I understood the pieces individually, like joins and COUNT, but didn’t fully understand how to combine them correctly. It was more about connecting concepts than learning something completely new.

**2. How did you evaluate whether the AI's output was correct or useful before using it?**

After getting the query, I didn’t just drop it into my code. I ran it directly in psql first so I could see exactly what it returned. I compared the output to what I expected based on my seeded data. For example, I knew roughly how many RSVPs certain events had, so I checked whether the counts matched.

I also paid attention to whether events with zero RSVPs still showed up, since that was part of the requirement. At one point, I noticed that some events were missing, which helped me realize I needed a LEFT JOIN instead of a regular JOIN. That lined up with what the AI had explained, so it gave me more confidence that the explanation was actually useful.

**3. How did what the AI produced differ from what you ultimately used, and what does that tell you about your own understanding of the problem?**

The AI gave me a solid starting query, but I still had to adjust it to fit my project. For example, I had to match my actual table and column names, and I added an ORDER BY clause so the events would be sorted by date like the API contract required.

I also made sure the query grouped by the correct fields. The AI example grouped things slightly differently, and when I first used it, I got an error about columns needing to appear in the GROUP BY clause. Fixing that forced me to understand what was actually happening instead of just copying the query.

**4. What did you learn from using AI in this way?**

This helped me understand how joins and aggregation actually work together instead of just treating them as separate concepts. Before this, GROUP BY felt kind of confusing, but now I see that it is what allows you to combine rows and calculate things like counts correctly.

I also learned how important it is to test queries outside of your application. Running things in psql made it much easier to debug and understand what was going wrong.

More than anything, I learned how to use AI as a tool to guide my thinking instead of replacing it. The answer wasn’t perfect, but it pointed me in the right direction and helped me figure it out myself.
