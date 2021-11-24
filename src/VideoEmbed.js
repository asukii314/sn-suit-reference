
const VideoEmbed = ({ url }) => {
    const embedUrl = (
          url.includes('youtu')
        ? `https://www.youtube.com/embed/${url.slice(url.length-11)}`
        : url
    );
    return (
      <div className="video-responsive">
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="true"
          title="YouTube video player"
        />
      </div>
    );
}

export default VideoEmbed;
