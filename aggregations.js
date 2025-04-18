/* -------------------------------------------------------------------------- */
/*                                     01                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: null,
      total_vendas: { $sum: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     02                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$Categoria",
      total_vendas: { $sum: 1 },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     03                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$MARCAS",
      valor_medio: { $avg: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     04                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$COD_CLIENTE",
      total_produtos: { $sum: "$QTD" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     05                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$cod_produto",
      total_vendas: { $sum: "$QTD" },
    },
  },
  {
    $sort: { total_vendas: -1 },
  },
  {
    $limit: 1,
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     06                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$DATA_VENDA",
      total_vendas: {
        $sum: "$VALOR",
      },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     07                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$COD_CLIENTE",
      total_produtos: { $sum: "$QTD" },
    },
  },
  {
    $sort: { total_produtos: -1 },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     08                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$COD_CLIENTE",
      valor_medio: { $avg: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     09                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$DESCRICAO",
      total_vendas: { $sum: 1 },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     10                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: { descricao: "$DESCRICAO", categoria: "$CATEGORIA" },
      total_produtos: { $sum: "$QTD" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     11                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  { $group: { _id: "$CATEGORIA", avgSellValue: { $avg: "$VALOR" } } },
]);

/* -------------------------------------------------------------------------- */
/*                                     12                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: "$CATEGORIA",
      minSellValue: { $min: "$VALOR" },
      maxSellValue: { $max: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     13                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: { marca: "$MARCAS", categoria: "$CATEGORIA" },
      somaValor: { $sum: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     14                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: { marca: "$MARCAS", categoria: "$CATEGORIA" },
      somaValorVendas: { $sum: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     15                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([{ $sort: { DATA_VENDA: 1 } }]);

/* -------------------------------------------------------------------------- */
/*                                     16                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([{ $match: { VALOR: { $gte: 20 } } }]);

/* -------------------------------------------------------------------------- */
/*                                     17                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      _id: 0,
      VALOR: 1,
      anoVenda: {
        $year: {
          $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
        },
      },
    },
  },
  {
    $group: { _id: "$anoVenda", totalDeVendas: { $sum: "$VALOR" } },
  },
  {
    $sort: { _id: 1 },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     18                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      _id: 0,
      VALOR: 1,
      anoVenda: {
        $year: {
          $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
        },
      },
    },
  },
  {
    $group: { _id: "$anoVenda", totalDeVendas: { $avg: "$VALOR" } },
  },
  {
    $sort: { _id: 1 },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     19                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $match: {
      $and: [{ VALOR: { $gte: 10 } }, { VALOR: { $lte: 30 } }],
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     20                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  { $group: { _id: "$COD_VENDA", totalDaVenda: { $sum: "$VALOR" } } },
  { $sort: { total: -1 } },
  { $limit: 5 },
]);

/* -------------------------------------------------------------------------- */
/*                                     21                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  { $group: { _id: "$COD_VENDA", totalDaVenda: { $sum: "$VALOR" } } },
  { $sort: { totalDaVenda: 1 } },
  { $limit: 5 },
]);

/* -------------------------------------------------------------------------- */
/*                                     22                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      QTD: 1,
      convData: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $group: {
      _id: {
        ano: { $year: "$convData" },
        mes: { $month: "$convData" },
      },
      QtdeProdutos: { $sum: "$QTD" },
    },
  },
  { $sort: { "_id.ano": 1, "_id.mes": 1 } },
]);

/* -------------------------------------------------------------------------- */
/*                                     23                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      VALOR: 1,
      convData: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $group: {
      _id: {
        ano: { $year: "$convData" },
        mes: { $month: "$convData" },
      },
      valorVendas: { $sum: "$VALOR" },
    },
  },
  { $sort: { "_id.ano": 1, "_id.mes": 1 } },
]);

/* -------------------------------------------------------------------------- */
/*                                     24                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  { $group: { _id: "$COD_CLIENTE", valorVendasCliente: { $sum: "$VALOR" } } },
  {
    $sort: { valorVendasCliente: -1 },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     25                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      VALOR: 1,
      convData: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $group: {
      _id: {
        ano: { $year: "$convData" },
        mes: { $month: "$convData" },
      },
      valorVendas: { $avg: "$VALOR" },
    },
  },
  { $sort: { "_id.ano": 1, "_id.mes": 1 } },
]);

/* -------------------------------------------------------------------------- */
/*                                     26                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([{ $match: { VALOR: { $gte: 50 } } }]);

/* -------------------------------------------------------------------------- */
/*                                     27                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      VALOR: 1,
      convData: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $group: {
      _id: {
        dia: { $dayOfWeek: "$convData" },
      },
      valorMedioVendasSemanal: { $avg: "$VALOR" },
    },
  },
  { $sort: { "_id.dia": 1 } },
]);

/* -------------------------------------------------------------------------- */
/*                                     29                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      QTD: 1,
      convData: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $group: {
      _id: {
        dia: { $dayOfWeek: "$convData" },
      },
      qtdeDeProdutosVendidos: { $avg: "$QTD" },
    },
  },
  { $sort: { "_id.dia": 1 } },
]);

/* -------------------------------------------------------------------------- */
/*                                     30                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  { $group: { _id: "$MARCAS", mediaValorvendaPorMarca: { $avg: "$VALOR" } } },
]);

/* -------------------------------------------------------------------------- */
/*                                     31                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      _id: 1,
      COD_VENDA: 1,
      COD_CLIENTE: 1,
      DATA_VENDA: 1,
      COD_PRODUTO: 1,
      QTD: 1,
      NOME_CLIENTE: 1,
      DESCRICAO: 1,
      NOME: 1,
      CATEGORIA: 1,
      MARCAS: 1,
      VALOR: 1,
      mes: {
        $month: {
          $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
        },
      },
    },
  },
  {
    $match: {
      mes: { $eq: 2 },
    },
  },
  {
    $project: {
      mes: 0,
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     32                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  { $group: { _id: { codCliente: "$COD_CLIENTE", valor: "$VALOR" } } },
  { $sort: { "_id.codCliente": 1, "_id.valor": 1 } },
]);

/* -------------------------------------------------------------------------- */
/*                                     33                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $group: {
      _id: { categoria: "$CATEGORIA", marca: "$MARCAS" },
      valorVendas: { $sum: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     34                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      _id: 1,
      COD_VENDA: 1,
      COD_CLIENTE: 1,
      DATA_VENDA: 1,
      COD_PRODUTO: 1,
      QTD: 1,
      NOME_CLIENTE: 1,
      DESCRICAO: 1,
      NOME: 1,
      CATEGORIA: 1,
      MARCAS: 1,
      VALOR: 1,
      dataConv: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $addFields: {
      mes: { $month: "$dataConv" },
    },
  },
  {
    $match: {
      mes: { $gte: 1, $lte: 6 },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     35                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      VALOR: 1,
      dataConv: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $addFields: {
      mes: { $month: "$dataConv" },
    },
  },
  {
    $match: {
      mes: { $gte: 1, $lte: 6 },
    },
  },
  {
    $group: {
      _id: 0,
      medValor: { $avg: "$VALOR" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     36                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      QTD: 1,
      dataConv: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $addFields: {
      mes: { $month: "$dataConv" },
    },
  },
  {
    $match: {
      mes: { $gte: 1, $lte: 6 },
    },
  },
  {
    $group: {
      _id: 0,
      qtdeDeProdutos: { $sum: "$QTD" },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     37                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $sort: {
      CATEGORIA: 1,
      VALOR: -1,
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     38                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $match: {
      VALOR: { $in: [10, 20, 30] },
    },
  },
]);

/* -------------------------------------------------------------------------- */
/*                                     39                                     */
/* -------------------------------------------------------------------------- */
db.vendas.aggregate([
  {
    $project: {
      _id: 1,
      COD_VENDA: 1,
      COD_CLIENTE: 1,
      DATA_VENDA: 1,
      COD_PRODUTO: 1,
      QTD: 1,
      NOME_CLIENTE: 1,
      DESCRICAO: 1,
      NOME: 1,
      CATEGORIA: 1,
      MARCAS: 1,
      VALOR: 1,
      dataConv: {
        $dateFromString: { dateString: "$DATA_VENDA", format: "%d/%m/%Y" },
      },
    },
  },
  {
    $addFields: {
      mes: { $month: "$dataConv" },
    },
  },
  {
    $match: {
      mes: { $eq: 12 },
    },
  },
]);
