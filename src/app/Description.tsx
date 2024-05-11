export default function Description() {
  return (
    <header className="home-paragraph-container">
      <div className="home-paragraph">
        <div className="text">
          <h2>Learn with us!</h2>
          <p>
            Welcome to the Video Game Development Club! We are actors, artists, designers,
            musicians, programmers, writers, and more! All skill levels are welcome, and
            we’re always willing to teach.
          </p>
          <a href="https://discord.gg/Yst7Zwn4wk" target="_blank">
            <div className="discord-button">Join our Discord</div>
          </a>
        </div>
        <picture>
          <source
            media="(max-width: 499px)"
            srcSet="/images/home/VGDC_Home_Photo_500w.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 500px)"
            srcSet="/images/home/VGDC_Home_Photo.webp"
            type="image/webp"
          />
          <source srcSet="/images/home/VGDC_Home_Photo.jpg" type="image/jpeg" />
          <img
            src="/images/home/VGDC_Home_Photo.jpg"
            alt="Fall 2022 Semester Games Showcase"
          />
        </picture>
      </div>
    </header>
  );
}
