import React from 'react';
import { Grid } from '@mui/material'; //not default export

import {SearchBar, VideoDetail, VideoList} from './components';

// import SearchBar from './components/SearchBar';
// // import VideoList from '.components';
// import VideoDetail  from './components/VideoDetail';

import youtube from './api/youtube';


class App extends React.Component { //class based component, access to the state
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount(){
        this.handleSubmit('world news')
    }


    onVideoSelect = (video)  => {
        this.setState({selectedVideo: video});
    }


    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', { 
        params: {
            part: 'snippet',
            maxResults: 5,
        key: "Your YOUTUBE API KEY",
            q: searchTerm,
        }
    });
    
    this.setState({videos:response.data.items, selectedVideo: response.data.items[0]});
    }

    render () {
        const {selectedVideo, videos} = this.state;
        return(
            <Grid justify="center" container spacing={10}>
                <Grid item xs={12}> 
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit = {this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;