import DbConn from '../database/dbConn.js'

class ContractController {
    // Get all active contracts
    static getAllActive(req, res) {
        try {
            DbConn.execute(
                'SELECT * FROM `contracts` where `is_active` = 1 AND `owner` = ?',
                [req.body.wallet],
                function(err, results, fields) {
                res.status(200).json(results)    
            }
              )
        } catch (error) {
            console.log(error)
            res.status(403).json(error)    
        }
    }

    static createContract(req, res) {
        DbConn.execute(
            'INSERT INTO `contracts`(`client`, `wallet`, `date`, `amount`, `is_active`, `owner`) VALUES (?,?,?,?,?,?)',
            [req.body.client, req.body.wallet, req.body.date, req.body.amount, 1, req.body.owner],
            function(results){
                res.status(200).json({message: "Contract Created"})
            }
        )
    }
}

export default ContractController;