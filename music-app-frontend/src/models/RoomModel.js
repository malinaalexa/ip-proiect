export default class RoomModel {
    constructor({ id, hostId, playlistId, active, createdAt }) {
      this.id = id;
      this.hostId = hostId;
      this.playlistId = playlistId;
      this.active = active || false;
      this.createdAt = new Date(createdAt);
    }
  
    static fromServerResponse(data) {
      return new RoomModel({
        id: data.id,
        hostId: data.host_id,
        playlistId: data.playlist_id,
        active: data.active,
        createdAt: data.created_at,
      });
    }
  }
  