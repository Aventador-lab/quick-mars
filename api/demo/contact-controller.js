Contact = require("./contact-model");

// handle index actions
exports.index = function (req, res) {
  Contact.get(function (err, contacts) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "Contracts recieved successfully",
      data: contacts,
    });
  });
};

exports.new = function (req, res) {
  var contact = new Contact();

  contact.name = req.body.name ? req.body.name : contact.name;
  contact.uid = req.body.uid;

  contact.email = req.body.email;
  contact.nickname = req.body.nickname;
  contact.phone = req.body.phone;
  contact.gender = req.body.gender;

  contact.save(function (err) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        message: "New contact created.",
        data: contact,
      });
    }
  });
};

exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: "Contact details loading...",
      data: contact,
    });
  });
};

exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contract) {
    if (err) {
      res.send(err);
    }

    contract.name = req.body.name ? req.body.name : contract.name;
    contract.uid = req.body.uid ? req.body.uid : contract.uid;

    contract.nickname = req.body.nickname || contract.nickname;
    contract.phone = req.body.phone;
    contract.email = req.body.email;
    contract.gender = req.body.gender || contract.gender;
    contact.save(function (err) {
      if (err) {
        res.json(err);
      }

      res.json({
        message: "Contact Info updated.",
        data: contact,
      });
    });
  });
};

exports.delete = function (req, res) {
  Contact.remove(
    {
      _id: req.params.contact_id,
    },
    function (err, contact) {
      if (err) res.send(err);

      res.json({
        status: "success",
        message: "contact deleted",
      });
    }
  );
};
