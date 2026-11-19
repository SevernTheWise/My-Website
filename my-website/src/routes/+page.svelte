<svelte:head>
    <title>My Website | Kelvin Hutchinson</title>
</svelte:head>

<section class="hero">
    <p class="label">Personal Website</p>
    <h1>Kelvin Hutchinson</h1>
    <p class="tagline">"In another moment down went Alice after it, never once considering how in the world she was to get out again." - Lewis Carroll</p>
    <div class="actions">
        <a class="button" href="/about">About Me</a>
        <a class="button secondary" href="/contact">Contact</a>
    </div>
</section>

<style>
    .hero{
        text-align: center;
        padding: 4rem 2rem;
        max-width: 40rem;
        margin: 0 auto;
    }
    .tagline{
        font-style: italic;
        color: #555;
        margin-top: 1rem;
    }
    .actions{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 2rem;
    }
    .button{
        padding: 0.75rem 1.5rem;
        background-color: #007BFF;
        color: white;
        text-decoration: none;
        border-radius: 0.25rem;
        transition: background-color 0.3s ease;
    }
    .button:hover{
        background-color: #0056b3;
    }
    .button.secondary{
        background-color: #6c757d;
    }
    .button.secondary:hover{
        background-color: #5a6268;
    }
</style>