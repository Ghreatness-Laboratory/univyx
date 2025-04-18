import logo from "../../assets/univyx-logo.svg";
import type { GameLeaderboard } from "../../types/gaming";

export const gameLeaderboards: GameLeaderboard[] = [
  {
    gameId: 1,
    gameName: "Valorant",
    leaderboard: [
      {
        rank: 1,
        universityId: "1",
        universityName: "Bells University",
        logo: logo,
        members: 32,
      },
      {
        rank: 2,
        universityId: "4",
        universityName: "Covenant University",
        logo: logo,
        members: 29,
      },
      {
        rank: 3,
        universityId: "2",
        universityName: "Babcock University",
        logo: logo,
        members: 28,
      },
      {
        rank: 4,
        universityId: "5",
        universityName: "Crawford University",
        logo: logo,
        members: 27,
      },
      {
        rank: 5,
        universityId: "3",
        universityName: "MIT",
        logo: logo,
        members: 26,
      },
    ],
  },

  {
    gameId: 2,
    gameName: "League of Legends",
    leaderboard: [
      {
        rank: 1,
        universityId: "2",
        universityName: "Babcock University",
        logo: logo,
        members: 35,
      },
      {
        rank: 2,
        universityId: "3",
        universityName: "MIT",
        logo: logo,
        members: 30,
      },
      {
        rank: 3,
        universityId: "1",
        universityName: "Bells University",
        logo: logo,
        members: 32,
      },
      {
        rank: 4,
        universityId: "6",
        universityName: "Baze University",
        logo: logo,
        members: 29,
      },
      {
        rank: 5,
        universityId: "4",
        universityName: "Covenant University",
        logo: logo,
        members: 28,
      },
    ],
  },

  {
    gameId: 3,
    gameName: "CS:GO",
    leaderboard: [
      {
        rank: 1,
        universityId: "3",
        universityName: "MIT",
        logo: logo,
        members: 33,
      },
      {
        rank: 2,
        universityId: "5",
        universityName: "Crawford University",
        logo: logo,
        members: 31,
      },
      {
        rank: 3,
        universityId: "6",
        universityName: "Baze University",
        logo: logo,
        members: 30,
      },
      {
        rank: 4,
        universityId: "1",
        universityName: "Bells University",
        logo: logo,
        members: 29,
      },
      {
        rank: 5,
        universityId: "4",
        universityName: "Covenant University",
        logo: logo,
        members: 27,
      },
    ],
  },
  {
    gameId: 4,
    gameName: "Dota 2",
    leaderboard: [
      {
        rank: 1,
        universityId: "4",
        universityName: "Covenant University",
        logo: logo,
        members: 35,
      },
      {
        rank: 2,
        universityId: "1",
        universityName: "Bells University",
        logo: logo,
        members: 33,
      },
      {
        rank: 3,
        universityId: "5",
        universityName: "Crawford University",
        logo: logo,
        members: 32,
      },
      {
        rank: 4,
        universityId: "2",
        universityName: "Babcock University",
        logo: logo,
        members: 30,
      },
      {
        rank: 5,
        universityId: "6",
        universityName: "Baze University",
        logo: logo,
        members: 29,
      },
    ],
  },
];
