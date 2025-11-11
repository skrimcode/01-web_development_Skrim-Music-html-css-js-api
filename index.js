     const tracksData = [
            { id: 1, name: "Digital Dreams", performer: "Cyber Flow", time: "3:45", style: "Electronic" },
            { id: 2, name: "Code Symphony", performer: "Dev Beats", time: "4:20", style: "Ambient" },
            { id: 3, name: "Neon Lights", performer: "Synth Wave", time: "3:15", style: "Synthwave" },
            { id: 4, name: "Algorithm", performer: "Binary Sound", time: "5:10", style: "Techno" },
            { id: 5, name: "Cloud Nine", performer: "Virtual Reality", time: "3:55", style: "Chillout" },
            { id: 6, name: "Data Stream", performer: "Tech Master", time: "4:30", style: "Drum & Bass" },
            { id: 7, name: "Pixel Perfect", performer: "Game Dev", time: "3:25", style: "Electronic" },
            { id: 8, name: "Future Bass", performer: "Digital Native", time: "4:05", style: "Future Bass" }
        ];

        const songsList = document.getElementById('songsList');
        const searchField = document.getElementById('searchField');
        const searchOutput = document.getElementById('searchOutput');
        const primaryContent = document.getElementById('primaryContent');
        const playButton = document.getElementById('playButton');
        const activeSongName = document.getElementById('activeSongName');
        const activeSongAuthor = document.getElementById('activeSongAuthor');

        let selectedTrack = null;
        let playingState = false;

        function populateTracks() {
            songsList.innerHTML = '';
            tracksData.forEach((item, idx) => {
                const trackElement = document.createElement('div');
                trackElement.className = 'song-row';
                trackElement.innerHTML = `
                    <div class="song-index">${idx + 1}</div>
                    <div class="song-data">
                        <div class="song-name">${item.name}</div>
                        <div class="song-author">${item.performer}</div>
                    </div>
                    <div class="song-length">${item.time}</div>
                `;
                trackElement.addEventListener('click', () => selectTrack(item));
                songsList.appendChild(trackElement);
            });
        }

        function selectTrack(track) {
            selectedTrack = track;
            activeSongName.textContent = track.name;
            activeSongAuthor.textContent = track.performer;
            playingState = true;
            playButton.textContent = '⏸️';
        }

        function findTracks(searchText) {
            if (searchText.length < 2) {
                searchOutput.style.display = 'none';
                primaryContent.style.display = 'block';
                return;
            }

            const foundItems = tracksData.filter(item => 
                item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.performer.toLowerCase().includes(searchText.toLowerCase()) ||
                item.style.toLowerCase().includes(searchText.toLowerCase())
            );

            showFoundItems(foundItems);
        }

        function showFoundItems(items) {
            searchOutput.innerHTML = '';
            primaryContent.style.display = 'none';
            searchOutput.style.display = 'block';

            if (items.length === 0) {
                searchOutput.innerHTML = '<div style="padding: 20px; text-align: center; color: #b3b3b3;">Ничего не найдено</div>';
                return;
            }

            items.forEach(item => {
                const resultElement = document.createElement('div');
                resultElement.className = 'search-hit';
                resultElement.innerHTML = `
                    <div style="margin-right: 15px;">🎵</div>
                    <div>
                        <div style="font-weight: bold;">${item.name}</div>
                        <div style="color: #b3b3b3; font-size: 14px;">${item.performer} • ${item.style}</div>
                    </div>
                `;
                resultElement.addEventListener('click', () => selectTrack(item));
                searchOutput.appendChild(resultElement);
            });
        }

        searchField.addEventListener('input', (e) => {
            findTracks(e.target.value);
        });

        playButton.addEventListener('click', () => {
            if (selectedTrack) {
                playingState = !playingState;
                playButton.textContent = playingState ? '⏸️' : '▶️';
            }
        });

        document.addEventListener('DOMContentLoaded', () => {
            populateTracks();
        });