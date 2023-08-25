import embeddedCode from './instaEbeded';

const InstagramEmbededRandom = () => {
  const embeddedCodeLength = embeddedCode.length;
  const setEmbed = Math.floor(Math.random() * embeddedCodeLength);
  return (
    <>
      <h2>Ми в Instagram</h2>
      <div dangerouslySetInnerHTML={{ __html: embeddedCode[setEmbed] }} />
    </>
  );
};

export default InstagramEmbededRandom;

