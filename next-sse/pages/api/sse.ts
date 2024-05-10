import { NextApiRequest, NextApiResponse } from 'next';



export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Content-Encoding': 'none',
    });
    let timer: any;
    let counter = 1;
    const limit = 10;
    // Check if the client accepts SSE
    if (req.headers.accept && req.headers.accept === 'text/event-stream') {
        //Set SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        const HEARTBEAT_INTERVAL = 5000; // 5 seconds (adjust this as needed)

        timer = setInterval(() => {
            if (counter === limit) {
                clearTimeout(timer);
            }
            fetch(`https://randomuser.me/api/?seed=foobar&results=${counter}`)
                .then((r) => r.json())
                .then((data) => {
                    const getData = () => `id: 12345\nretry: 5000\ndata: ${JSON.stringify(data)}\n\n`;
                    console.log(getData());
                    res.write(getData());
                });
            counter++;
            res.write(': heartbeat\n\n');
        }, HEARTBEAT_INTERVAL);

        req.socket.on("close", () => {
            if (timer) {

                clearInterval(timer);
            }
        });

    } else {
        res.status(404).end();

    }

}


/****
 * cách 2
 * 
 * import EventSource from 'eventsource';
export const dynamic = 'force-dynamic';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const uri = req?.headers?.['x-custom-header'];
    const url = `${process.env.API_SERVER_DEV_SSE}/notice-center/${uri}`;
    res.writeHead(200, {
        Connection: 'keep-alive',
        'Content-Encoding': 'none',
        'Cache-Control': 'no-cache, no-transform',
        'Content-Type': 'text/event-stream',
    });
    let responseStream = new TransformStream();
    const writer = responseStream.writable.getWriter();
    if (!req.headers.authorization) {
        writer.close();
    }

    const local_api_sse = new EventSource(url, {
        headers: {
            Authorization: req.headers.authorization ?? '',
        },
    });

    local_api_sse.onmessage = async (e) => {
        res.write(`event: message\ndata: ${e.data}\n\n`);
        return;
    };

    local_api_sse.onerror = (e) => {
        const errorMessage =
            e.status === 401
                ? 'Authentication failed'
                : 'An error occurred. Auto-reload is not working.';

        if (!res.writableEnded) {
            res.write(`event: error\ndata: ${errorMessage}\n\n`);
            local_api_sse.close();
        } else {
            res.write(
                'event: error\ndata: An error occurred. Auto-reload is not working.',
            );
        }
    };

    req.socket.on('close', () => {
        local_api_sse.close();
        res.end();
        return;
    });
}

 * 
 */