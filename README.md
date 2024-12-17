# ChaitanyaP28.github.io
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Portfolio</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f9;
        }
        
        header {
            background-color: #333;
            color: #fff;
            padding: 1rem 0;
            text-align: center;
        }
        
        nav ul {
            display: flex;
            justify-content: center;
            list-style: none;
            background-color: #444;
        }
        
        nav ul li {
            margin: 0 20px;
        }
        
        nav ul li a {
            color: #fff;
            text-decoration: none;
        }
        
        nav ul li a:hover {
            text-decoration: underline;
        }
        
        .hero {
            text-align: center;
            padding: 100px 20px;
            background: #555;
            color: #fff;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
        }
        
        .about, .projects, .contact {
            padding: 50px 20px;
            text-align: center;
        }
        
        .about h2, .projects h2, .contact h2 {
            font-size: 2rem;
            margin-bottom: 20px;
        }
        
        .projects .project-item {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
        
        .projects .project-item div {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
            padding: 20px;
        }
        
        .projects .project-item img {
            width: 100%;
            border-radius: 10px 10px 0 0;
        }
        
        .contact form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .contact form input, 
        .contact form textarea, 
        .contact form button {
            width: 100%;
            max-width: 400px;
            padding: 10px;
            margin-bottom: 10px;
        }
        
        footer {
            background-color: #333;
            color: #fff;
            text-align: center;
            padding: 20px 0;
        }
    </style>
</head>
<body>

<header>
    <h1>Your Name</h1>
    <p>Welcome to my portfolio website!</p>
</header>

<nav>
    <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</nav>

<section class="hero">
    <h1>Hello, I'm [Your Name]</h1>
    <p>I'm a [Your Profession] who specializes in [Your Skills/Technologies].</p>
</section>

<section id="about" class="about">
    <h2>About Me</h2>
    <p>Write a short paragraph about yourself, your experience, and what makes you unique as a [Your Profession].</p>
</section>

<section id="projects" class="projects">
    <h2>My Projects</h2>
    <div class="project-item">
        <div>
            <img src="project1.jpg" alt="Project 1">
            <h3>Project 1</h3>
            <p>Description of Project 1.</p>
        </div>
        <div>
            <img src="project2.jpg" alt="Project 2">
            <h3>Project 2</h3>
            <p>Description of Project 2.</p>
        </div>
        <div>
            <img src="project3.jpg" alt="Project 3">
            <h3>Project 3</h3>
            <p>Description of Project 3.</p>
        </div>
    </div>
</section>

<section id="contact" class="contact">
    <h2>Contact Me</h2>
    <form action="https://formspree.io/f/yourformid" method="POST">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
    </form>
</section>

<footer>
    <p>Copyright &copy; 2024 Your Name. All Rights Reserved.</p>
</footer>

</body>
</html>
