// Queries feitas no MSQL //
const leaderboardHome = `
  SELECT 
      T.team_name AS name,
      COUNT(*) AS totalGames,
      SUM(
          CASE
              WHEN M.home_team_goals > M.away_team_goals THEN 3
              WHEN M.home_team_goals = M.away_team_goals THEN 1
              ELSE 0
          END
      ) AS totalPoints,
      SUM(
          CASE
              WHEN M.home_team_goals > M.away_team_goals THEN 1
              ELSE 0
          END
      ) AS totalVictories,
      SUM(
          CASE
              WHEN M.home_team_goals = M.away_team_goals THEN 1
              ELSE 0
          END
      ) AS totalDraws,
      SUM(
          CASE
              WHEN M.home_team_goals < M.away_team_goals THEN 1
              ELSE 0
          END
      ) AS totalLosses,
      SUM(M.home_team_goals) AS goalsFavor,
      SUM(M.away_team_goals) AS goalsOwn,
      SUM(M.home_team_goals - M.away_team_goals) AS goalsBalance,
      FORMAT(
          (SUM(
              CASE
                  WHEN M.home_team_goals > M.away_team_goals THEN 3
                  WHEN M.home_team_goals = M.away_team_goals THEN 1
                  ELSE 0
              END
          ) / (COUNT(M.id) * 3)) * 100, 2
      ) AS efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams AS T
  INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS M
  ON T.id = M.home_team_id
  WHERE M.in_progress = false
  GROUP BY T.id
  ORDER BY 
      totalPoints DESC,
      totalVictories DESC,
      goalsBalance DESC,
      goalsFavor DESC
`;

const leaderboardAway = `
SELECT 
    T.team_name AS name,
    COUNT(*) AS totalGames,
    SUM(CASE WHEN M.home_team_goals < M.away_team_goals THEN 3 ELSE 0 END
        + CASE WHEN M.home_team_goals = M.away_team_goals THEN 1 ELSE 0 END
    ) AS totalPoints,
    SUM(CASE WHEN M.home_team_goals < M.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
    SUM(CASE WHEN M.home_team_goals = M.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
    SUM(CASE WHEN M.home_team_goals > M.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
    SUM(M.away_team_goals) AS goalsFavor,
    SUM(M.home_team_goals) AS goalsOwn,
    SUM(M.away_team_goals - M.home_team_goals) AS goalsBalance,
    FORMAT(
        (SUM(CASE WHEN M.home_team_goals < M.away_team_goals THEN 3 ELSE 0 END
            + CASE WHEN M.home_team_goals = 
            M.away_team_goals THEN 1 ELSE 0 END) / (COUNT(*) * 3)) * 100, 2
    ) AS efficiency
FROM 
    TRYBE_FUTEBOL_CLUBE.matches AS M
    INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS T
        ON T.id = M.away_team_id
WHERE 
    M.in_progress = false
GROUP BY 
    T.id
ORDER BY 
    totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC;

`;
const leaderboardAll = `
SELECT
T.team_name AS name,
COUNT(*) AS totalGames,
SUM(
    CASE
        WHEN M.home_team_id = T.id AND
        M.home_team_goals > M.away_team_goals THEN 3
        WHEN M.away_team_id = T.id AND
        M.home_team_goals < M.away_team_goals THEN 3
        WHEN M.home_team_goals = M.away_team_goals THEN 1
        ELSE 0
    END
) AS totalPoints,
SUM(
    CASE
        WHEN M.home_team_id = T.id AND
        M.home_team_goals > M.away_team_goals THEN 1
        WHEN M.away_team_id = T.id AND
        M.home_team_goals < M.away_team_goals THEN 1
        ELSE 0
    END
) AS totalVictories,
SUM(
    CASE 
        WHEN M.home_team_goals = M.away_team_goals THEN 1
        ELSE 0
    END
) AS totalDraws,
SUM(
    CASE
        WHEN M.home_team_id = T.id AND
        M.home_team_goals < M.away_team_goals THEN 1
        WHEN M.away_team_id = T.id AND
        M.home_team_goals > M.away_team_goals THEN 1
        ELSE 0
    END
) AS totalLosses,
SUM(CASE WHEN M.home_team_id = T.id THEN M.home_team_goals ELSE 0 END) +  
SUM(CASE WHEN M.away_team_id = T.id THEN M.away_team_goals ELSE 0 END) AS goalsFavor,
SUM(CASE WHEN M.home_team_id = T.id THEN M.away_team_goals ELSE 0 END) +
SUM(CASE WHEN M.away_team_id= T.id THEN M.home_team_goals ELSE 0 END) AS goalsOwn,
((SUM(CASE WHEN M.home_team_id = T.id THEN M.home_team_goals ELSE 0 END) +  
SUM(CASE WHEN M.away_team_id = T.id THEN M.away_team_goals ELSE 0 END)) - 
(SUM(CASE WHEN M.home_team_id = T.id THEN M.away_team_goals ELSE 0 END) +
SUM(CASE WHEN M.away_team_id= T.id THEN M.home_team_goals ELSE 0 END))) AS goalsBalance,
FORMAT(
    (SUM(
        CASE
            WHEN M.home_team_id = T.id AND M.home_team_goals > M.away_team_goals THEN 3
            WHEN M.away_team_id = T.id AND M.home_team_goals < M.away_team_goals THEN 3
            WHEN M.home_team_goals = M.away_team_goals THEN 1
            ELSE 0
        END
    ) / (COUNT(M.id) * 3)) * 100, 2
) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.teams AS T
INNER JOIN TRYBE_FUTEBOL_CLUBE.matches AS M
ON (T.id = M.home_team_id OR T.id = M.away_team_id)
WHERE M.in_progress = false
GROUP BY T.id
ORDER BY 
totalPoints DESC,
totalVictories DESC,
goalsBalance DESC,
goalsFavor DESC;
`;

export { leaderboardHome, leaderboardAway, leaderboardAll };
