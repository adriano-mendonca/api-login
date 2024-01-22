const connection = require("./connection");
const bcrypt = require("bcrypt");

const getIpByDate = async (data_inicio, data_fim) => {
  const result = await connection.query(
    `SELECT 
        radacctid, username, nasipaddress, nasportid, acctstarttime, acctupdatetime, 
        acctstoptime, acctsessiontime, acctinputoctets, acctoutputoctets, 
        callingstationid, framedipaddress 
    FROM 
        radacct_convidado 
    WHERE 
        (
            (DATE(acctstoptime) >= $1 OR DATE(acctupdatetime) >= $2) 
            AND DATE(acctstoptime) < $3 
            OR DATE(acctupdatetime) < $4
        ) 
        AND framedipaddress IS NOT NULL 
        AND (
            framedipaddress <<= '187/8' 
            OR framedipaddress <<= '168/8' 
            OR framedipaddress <<= '100/8' 
            OR framedipaddress <<= '172/8'
        );`,
    [data_inicio, data_inicio, data_fim, data_fim]
  );
  return result.rows;
};

const getAllIps = async () => {
  const result = await connection.query(
    "SELECT * FROM radacct_convidado limit 1"
  );

  return result.rows;
};

const addUser = async (username, password) => {
  const query = await connection.query(
    `
  INSERT INTO usuario (email, senha) VALUES (?,?)`,
    [username, password]
  );

  return query;
};

const verifyUser = async (username, password) => {
  try {
    const [rows, fields] = await connection.query(
      `SELECT senha, id_usuario FROM usuario WHERE email = ?`,
      [username]
    );
    if (!rows[0]) {
      throw new Error("Usuário inválido")
    }
    const isValidPassword = await bcrypt.compare(password, rows[0].senha);
    const id_usuario = rows[0].id_usuario;

    const response = {
      id_usuario: id_usuario,
      valid: isValidPassword,
    };
    return response;
  } catch(err) {
    return(err.message)
  }
};

const getAllUsers = async () => {
  const result = await connection.query(`SELECT * FROM usuario`);

  return result[0];
};

module.exports = { getIpByDate, getAllIps, addUser, verifyUser, getAllUsers };
