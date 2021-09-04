const express = require('express');
const router = express.Router();
const redis = require("redis");
const client = redis.createClient();

router.get('/hell', function (req, res) {
  client.get("data1", function (err, reply) {
    if (err) {
      res.json({
        error: err
      })
    } else {
      const data1 = JSON.parse(reply);
      client.lpop("queue", function (err, result) {
        if (err) {
          res.json({
            error: err
          })
        } else {
          const lpop_data = JSON.parse(result);
          client.rpop("queue", function (err, res_rpop) {
            if (err) {
              res.json({
                error: err
              })
            } else {
              const rpop_data = JSON.parse(res_rpop);
              client.hgetall("emp_data", function (err, hash_result) {
                if (err) {
                  res.json({
                    error: err
                  })
                } else {
                  const hash_data = hash_result;
                  res.json({
                    set_data: data1,
                    queue_lpop_data: lpop_data,
                    queue_rpop_data: rpop_data,
                    hashData: hash_data
                  })
                }
              })
            }

          })
        }

      })
    }
  });

});

router.post('/data1', function (req, res) {
  const bodyData = JSON.stringify(req.body);
  if (bodyData) {
    // for(var prop in bodyData){
    //     client.set(prop, bodyData[prop], redis.print);
    // }
    client.set("data1", bodyData, redis.print);
    res.json({
      success: "data set success"
    })
  } else {
    res.send({
      error: "body is empty"
    })
  }
});

router.post('/data2', function (req, res) {
  const bodyData = JSON.stringify(req.body);
  if (bodyData) {
    client.lpush("queue", bodyData, redis.print);
    res.json({
      success: "data lpush success"
    })
  } else {
    res.send({
      error: "body is empty"
    })
  }
});

router.post('/data3', function (req, res) {
  const bodyData = JSON.stringify(req.body);
  if (bodyData) {
    client.rpush("queue", bodyData, redis.print);
    res.json({
      success: "data rpush success"
    })
  } else {
    res.send({
      error: "body is empty"
    })
  }
});

router.post('/data4', function (req, res) {
  const bodyData = req.body;
  if (bodyData) {
    for (var name in bodyData) {
      client.hmset("emp_data", name, bodyData[name], redis.print);
    }
    res.json({
      success: "hash data success"
    })
  } else {
    res.send({
      error: "body is empty"
    })
  }
});

router.post('/data5', function (req, res) {
  const bodyData = req.query; // { ?test=test&shshs=hshsh }
  if (bodyData) {
    for (var i in bodyData) {
      client.hmset("emp_data", i, bodyData[i], redis.print);
    }
    res.json({
      success: "hash data success"
    })
  } else {
    res.send({
      error: "body is empty"
    })
  }
});

module.exports = router;