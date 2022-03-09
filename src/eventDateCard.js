import './eventCard.css'

const monthStr = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function getDateRangeString(start, end) {
    if(!end) {
        if(start) {
            const sd = new Date(start);
            return `${start}`;
        }
        return 'N/A';
    }
    const sd = new Date(start);
    const ed = new Date(end);

    if (sd.getFullYear() === ed.getFullYear()) {
        if(sd.getMonth() === ed.getMonth()) {
            return `${monthStr[sd.getMonth()]} ${sd.getDate()}–${ed.getDate()}, ${sd.getFullYear()}`;
        } else {
            return `${monthStr[sd.getMonth()]} ${sd.getDate()}–${monthStr[ed.getMonth()]} ${ed.getDate()}, ${sd.getFullYear()}`;
        }
    } else {
        return `${monthStr[sd.getMonth()]} ${sd.getDate()}, ${sd.getFullYear()}–${monthStr[ed.getMonth()]} ${ed.getDate()}, ${ed.getFullYear()}`
    }
}

function printRelativeDate(release) {
     if(!release || !release.start) return;
     const sd = new Date(release.start);
     const anchorDateStr = (release.end && sd.getTime() < Date.now() ? release.end : release.start)
     return (
         <i className='relative-event-date'>({relativeTimeString(anchorDateStr)})</i>
     )
}

function renderEventRelease(server, releases, type, subtype, eventType) {
    return (
        <div className='event-release'>
            <b>{server}: </b>{getEventStatus(releases, type.toLowerCase(), subtype?.toLowerCase(), eventType?.toLowerCase())}
            <ul className='event-release-list'>
                {releases?.map(release => (
                    <li>{getDateRangeString(release.start, release.end)} {printRelativeDate(release)}</li>
                ))}
            </ul>
        </div>
    )
}

function getEventStatus(releases, type, subtype, eventType) {
    // check if no release info
    // TODO: change to "unreleased" once more event info added, and then "unannounced" once 'spotted in index' info is added
    if(!releases || releases.length === 0) {
        return 'No release info';
    }

    const sd_1 = new Date(releases[0].start);
    const curTime = Date.now();

    // check for permanent availability
    if(releases.length === 1 && !releases[0].end) {
        if(sd_1.getTime() < curTime) {
            return 'Permanently Available';
        } else {
            return 'Coming Soon';
        }
    }

    // check if 2+ runs completed
    if(releases.length >= 2) {
        const ed_2 = new Date(releases[releases.length - 1].end);

        if(ed_2.getTime() < curTime) {
            if(subtype === 'gleam') {
                return 'Rerun Expected';
            } else {
                return 'Completed';
            }
        }

        const sd_2 = new Date(releases[1].start);
        if(sd_2.getTime() < curTime) {
            return 'Live Now (Rerun)';
        } else {
            return 'Coming Soon (Rerun)';
        }
    }

    // exactly one run completed
    const ed_1 = new Date(releases[0].end);
    if(ed_1.getTime() < curTime) {
        const singleRunSubtypes = [
            'collab',
            'pinnacle battle',
            'fashion plan'
        ];

        const permSeasonSubtypes = [
            'arena',
            'memory stairway',
            'styling competition'
        ]
        if(singleRunSubtypes.includes(subtype)) {
            return 'Completed';
        } else if(permSeasonSubtypes.includes(subtype)) {
            return 'Permanently Available';
        } else if(subtype === 'welfare') {
            if(eventType === 'welfare') return 'Completed';
            else return 'Rerun Expected';
        } else {
            return 'Rerun Expected';
        }
    }

    if(sd_1.getTime() < curTime) {
        return 'Live Now';
    } else {
        return 'Coming Soon';
    }

}

function relativeTimeString(timeString) {
    const date = new Date(timeString);
    const timeInMs = date.getTime();

    const msPerDay = 60 * 1000 * 60 * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    var elapsed = Date.now() - timeInMs;

    if (timeInMs > Date.now()) {
        const days = Math.round(-1*elapsed/msPerDay);
        return `In ${days} day${days === 1 ? '' : 's'}`;
    }

    else if (elapsed < msPerMonth) {
        const days = Math.round(1*elapsed/msPerDay);
        return `${days} day${days === 1 ? '' : 's'} ago`;
    }

    else if (elapsed < msPerYear) {
        const months = Math.round(1*elapsed/msPerMonth);
        return `${months} month${months === 1 ? '' : 's'} ago`;
    }

    else {
        const years = Math.round(1*elapsed/msPerYear);
        return `${years} year${years === 1 ? '' : 's'} ago`;
    }
}

export default function eventDateCard({ releases, sourceType, sourceSubype, eventType }) {
    return (
        <div className='event-card-container'>
            <div className="event-title">Releases</div>
            <div className='event-release-container'>
                {releases && Object.keys(releases).map(server => renderEventRelease(server, releases[server], sourceType, sourceSubype, eventType))}
            </div>
        </div>
    );
}
