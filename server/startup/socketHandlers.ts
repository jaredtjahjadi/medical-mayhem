import { Socket } from 'socket.io';
import SocketEvents from '../../client/src/constants/socketEvents'
import { randomBytes } from 'crypto';
import { io } from './index'

class SocketInfo {
    username: string
    gameRoom: string

    constructor(username = '') {
        this.username = username
        this.gameRoom = ''
    }
}

// The queue that will hold all players currently queueing for a game by username
export const queue : Socket[] = []

// Maps socket ids to a set of rooms
const socketInfos = new Map<string, SocketInfo>()

// TODO: ADD NAMESPACES SUCH AS /game, /message, etc.

export function handleConnection(socket: Socket) {

    // Maps the newly connected socket to an object holding its rooms
    socketInfos.set(socket.id, new SocketInfo())

    socket.on('disconnect', () => {

        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)

        socketInfos.delete(socket.id)
    })

    socket.on(SocketEvents.SET_USERNAME, (data) => {
        (socketInfos.get(socket.id) as SocketInfo).username = data
        console.log(data)
    })

    socket.on(SocketEvents.QUEUE_UP, (data) => {

        if (queue.length >= 3) {

            // Generate random room number and join it
            let room = randomBytes(8).toString('hex')
            socket.join(room)

            // Update room data structure
            const currSocketInfo = socketInfos.get(socket.id) as SocketInfo
            currSocketInfo.username = data
            currSocketInfo.gameRoom = room

            const players = []
            players.push(currSocketInfo.username)

            // Pop players from queue and add them to the room
            for (let i = 0; i < 3; i++) {
                const teammateSocket = queue.shift() as Socket
                teammateSocket.join(room)

                const currTeammateSocketInfo = socketInfos.get(teammateSocket.id) as SocketInfo
                currTeammateSocketInfo.gameRoom = room

                players.push(currTeammateSocketInfo.username)
            }

            io.to(room).emit(SocketEvents.MATCH_FOUND, {
                players: players
            })
        }
        else {
            queue.push(socket)
        }   
    })

    socket.on(SocketEvents.LEAVE_QUEUE, (data) => {
        if (queue.includes(socket))
            queue.splice(queue.indexOf(socket), 1)
        console.log(queue)
    })

    // GAMEPLAY

    // data is a player username, and a vec
    socket.on(SocketEvents.PLAYER_MOVED, (data) => {
        io.to((socketInfos.get(socket.id) as SocketInfo).gameRoom).emit(SocketEvents.PLAYER_MOVED, data)
    })
}

