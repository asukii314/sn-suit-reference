export default function ContactPage() {
  return (
    <div className="infopage">
      <h3> Get in touch </h3>
      <p>
        I love hearing from people! Please don't hesitate to reach out if you...
        <ul>
            <li>Spotted a bug to report</li>
            <li>Notice any inaccurate or missing suit/reflection info</li>
            <li>Have a suit, photo, or video you want added to the site</li>
            <li>Have any feedback or suggestions to share</li>
            <li>Would like to collaborate with me</li>
            <li>Or any other reason, really!</li>
        </ul>
      </p>
      <p>
      Here's a few ways to reach me:
      <ul>
      <li><b>Email:</b> <a className='inline' href="mailto:asukii314.twitch@gmail.com">asukii314.twitch@gmail.com</a></li>
      <li><b>Discord:</b> <a className='inline' href="https://discord.gg/hWCTc69C3Y">Join my guild's server</a>, or DM me @asukii#7286</li>
      <li><b>Github:</b> <a className='inline' href="https://github.com/asukii314/sn-suit-reference">Public repo is here</a> - feel free to make a PR!</li>
      </ul>
      </p>
    </div>
  );
}
