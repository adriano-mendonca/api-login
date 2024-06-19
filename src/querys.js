const connection = require("./connection");
const bcrypt = require("bcrypt");
const hubsoft = require("./connection/hubsoft");

const addUser = async (name, email, password, tipo) => {
  const query = await connection.query(
    `
  INSERT INTO usuario (name, email, senha, id_tipo_usuario) VALUES (?, ?, ?, ?)`,
    [name, email, password, tipo]
  );
  return query;
};

const addAprover = async (id, nome) => {
  const query = await connection.query(
    `INSERT INTO aprovador (id, nome) VALUES (?, ?)`,
    [id, nome]
  );
  return query;
};

const verifyUser = async (email, password) => {
  try {
    const [rows, fields] = await connection.query(
      `SELECT senha, id_usuario FROM usuario WHERE email = ?`,
      [email]
    );
    if (rows[0] === undefined) {
      return { valid: false };
    }
    const isValidPassword = await bcrypt.compare(password, rows[0].senha);
    const id_usuario = rows[0].id_usuario;

    const response = {
      id_usuario: id_usuario,
      valid: isValidPassword,
    };
    return response;
  } catch (err) {
    return err.message;
  }
};

const getAllUsers = async () => {
  const result = await connection.query(`SELECT * FROM usuario`);

  return result[0];
};

const getUser = async (id) => {
  const result = await connection.query(
    `SELECT name FROM usuario WHERE id_usuario = ?`,
    [id]
  );
  return result[0];
};

const getCentro = async () => {
  const { rows } = await hubsoft.query(
    "SELECT descricao, id_centro_custo FROM centro_custo WHERE ativo"
  );
  return rows;
};

const getFornecedor = async () => {
  const { rows } = await hubsoft.query(
    "select id_fornecedor, nome_razaosocial  from fornecedor f where ativo order by nome_razaosocial"
  );
  return rows;
};

const getAprovador = async () => {
  const result = await connection.query("select id, nome from aprovador");
  return result[0];
};

const postConta = async (
  centro,
  fornecedor,
  valor,
  descricao,
  observacao,
  solicitante,
  aprovador,
  path
) => {
  const result = await connection.query(
    `INSERT INTO contas (centro_custo, fornecedor, valor, descricao, observacao, id_aprovador, id_solicitante, path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      centro,
      fornecedor,
      valor,
      descricao,
      observacao,
      aprovador,
      solicitante,
      path,
    ]
  );
  return result[0];
};

const getContas = async (id, id2) => {
  const result = await connection.query(
    `SELECT contas.id_conta, contas.centro_custo, contas.fornecedor, contas.valor, contas.descricao, contas.observacao, ua.name as usuario_aprovador, us.name as usuario_solicitante, status.descricao as status, contas.path FROM contas LEFT JOIN usuario ua ON contas.id_aprovador = ua.id_usuario LEFT JOIN usuario us ON us.id_usuario = contas.id_solicitante LEFT JOIN status ON contas.status = status.id_status WHERE contas.id_solicitante = ? OR contas.id_aprovador = ?`,
    [id, id2]
  );
  return result[0];
};

const alterStatus = async (status, id) => {
  const result = await connection.query(
    `UPDATE contas SET status = ? WHERE id_conta = ?`,
    [status, id]
  );
  return result[0];
};

module.exports = {
  addUser,
  verifyUser,
  getAllUsers,
  getUser,
  getFornecedor,
  getAprovador,
  postConta,
  getContas,
  alterStatus,
  getCentro,
  addAprover,
};
