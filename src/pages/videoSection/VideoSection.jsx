import React from 'react';
import Layout from '../../components/layout/Layout';
import Video1 from '../../components/videos/video1.mp4';
import Video2 from '../../components/videos/video2.mp4';
import Video3 from '../../components/videos/video3.mp4';

const VideoSection = () => {
  return (
    <Layout>
      <section className="space-ptb pb-20" style={{ minHeight: '600px', paddingTop: '20px' }}>
        <div className="w-11/12 m-auto">  
          <div className="row">
            <div className="col-md-6" style={{ marginBottom: '20px' }}>
              <video height="310" controls style={{ width: '100%' }}>
                <source src={Video1} type="video/mp4" />
              </video>
            </div>
            <div className="col-md-6" style={{ marginBottom: '20px' }}>
              <video height="310" controls style={{ width: '100%' }}>
                <source src={Video2} type="video/mp4" />
              </video>
            </div>
            <div className="col-md-6" style={{ marginBottom: '20px' }}>
              <video height="310" controls style={{ width: '100%' }}>
                <source src={Video3} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VideoSection;
