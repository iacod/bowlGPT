import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

interface LeaderboardItem {
    id: string;
    name: string;
    score: number;
}

interface LeaderboardProps {
    socket : Socket;
}

function Leaderboard(props : LeaderboardProps) {
  const { socket } = props;
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    socket.on('leaderboard-update', (data : LeaderboardItem[]) => {
      setLeaderboard(data);
    });

    return () => {
      socket.off('leaderboard-update');
    };
  }, [socket]);

  leaderboard.sort((a, b) => b.score - a.score);

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Player</Th>
            <Th>Score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {leaderboard.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.name}</Td>
              <Td>{item.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Leaderboard;